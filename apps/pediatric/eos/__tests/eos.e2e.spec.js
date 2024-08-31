const puppeteer = require('puppeteer');
const testCases = require('./testCases')

const WELL_APPEARING = {
  NO_CULTURE: 'ללא תרביות, ללא טיפול אנטיביוטי',
  REGULAR_FOLLOW_UP: 'מעקב שגרתי',
  EMPIRIC_ANTIBIOTICS: 'טיפול אנטיביוטי אמפירי'
}
const UiResultToJsonShortString = {
  [WELL_APPEARING.NO_CULTURE]: 'ללא תרבית',
  [WELL_APPEARING.REGULAR_FOLLOW_UP]: 'שגרתי',
  [WELL_APPEARING.EMPIRIC_ANTIBIOTICS]: 'אנטיביוטי אמפירי'
}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getEosResult = async (fever, birthWeek, plusDays, rom, gbs, antibiotics) => {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/apps/pediatric/eos/');

  // waiting for terms popup
  await sleep(100);

  // Check if the modal exists
  const modal = await page.$('#usage-terms-dialog-backdrop');

  if (modal) {
    // Click the "I accept" button if the modal is present
    await page.click('#acceptTerms');
  }

  // Set fever 
  await page.focus('#temprature');
  await page.keyboard.type(fever.toString());

  await sleep(100); // sleep since not all fields instered ? 

  // Set birthweek
  await page.focus('#pregnancyLengthWeeks');
  await page.keyboard.type(birthWeek.toString());

  // Set plus days
  await page.focus('#pregnancyLengthDays');
  await page.keyboard.type(plusDays.toString());

  // Set rom
  await page.focus('#rom');
  await page.keyboard.type(rom.toString());

  // Set gbs status
  if (gbs === 'positive') {
    await page.select('#gbs', 'positive');
  } else if (gbs === 'negative') {
    await page.select('#gbs', 'negative');
  } else if (gbs === 'unknown') {
    await page.select('#gbs', 'unknown');
  }

  // Set Antibiotics status
  let noneRadio;
  if (antibiotics === 'broad-4') {
    noneRadio = await page.waitForSelector("#broad-4");
  } else if (antibiotics === 'broad-2') {
    noneRadio = await page.waitForSelector("#broad-2");
  } else if (antibiotics === 'GBS-2') {
    noneRadio = await page.waitForSelector("#GBS-2");
  } else if (antibiotics === 'none') {
    noneRadio = await page.waitForSelector("#none");
  }
  await noneRadio.click();

  // Wait for the result to appear
  await page.waitForSelector('#eosStatistics');

  // Sleep for 100ms
  // Hack, but we need to wait for the result to be fully rendered.
  // After moving to react we can move remove the sleep.
  await sleep(100);

  // Get the result and return it
  const eosRaw = await page.$eval('#eosStatistics', el => el.textContent);


  const listItems = await page.evaluate(() => {
    // Select all <li> elements within the specified section
    const items = Array.from(document.querySelectorAll('#headingOne ul li'));
  
    // Return the text content of each <li> element as an array
    return items.map(item => item.textContent.trim());
  });

  // const _wellAppearingRaw = 'ללא תרביות, ללא טיפול אנטיביוטי';
  const _wellAppearingRaw = listItems[1];
  const wellAppearing = UiResultToJsonShortString[_wellAppearingRaw.trim()];

  const eosStat = Number(eosRaw.trim());
  const clinicalIllnessEos = Number(await page.$eval('#clinicalIllnessEos', el => el.textContent))
  const equivocalEos = Number(await page.$eval('#equivocalEos', el => el.textContent))
  const wellAppearingEos = Number(await page.$eval('#wellAppearingEos', el => el.textContent))
  await browser.close();

  return { eosStat, wellAppearingEos, equivocalEos, clinicalIllnessEos, wellAppearing };
}

describe('eos-e2e-alignment-with-kaiser', () => {
  jest.setTimeout(5000);
  it.each(testCases)(
    "test case %o",
    async ({ fever, birthWeek, plusDays, rom, gbs, antibiotics, expectedResult }) => {
      const { eosStat, wellAppearingEos, equivocalEos, clinicalIllnessEos, wellAppearing } = await getEosResult(fever, birthWeek, plusDays, rom, gbs, antibiotics);      
      expect(eosStat).toEqual(expectedResult.eosStat);
      expect(wellAppearingEos).toEqual(expectedResult.wellAppearingEos);
      expect(equivocalEos).toEqual(expectedResult.equivocalEos);
      expect(clinicalIllnessEos).toEqual(expectedResult.clinicalIllnessEos);
    }
  );
});

test('eos-e2e-temprature-too-low', async () => {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/apps/pediatric/eos/');

  // waiting for terms popup
  await sleep(100);

  // Check if the modal exists
  const modal = await page.$('#usage-terms-dialog-backdrop');

  if (modal) {
    // Click the "I accept" button if the modal is present
    await page.click('#acceptTerms');
  }

  // Set fever 
  await page.focus('#temprature');
  await page.keyboard.type("35");
  // de-focus, to get the error msg
  await page.focus('#pregnancyLengthDays');
  value = await page.$eval('#temprature-error', el => el.textContent);
  expect(value).toEqual("המחשבון מתייחס לחום בטווח 36-40 בלבד.");

  await browser.close();
});

test('eos-e2e-temprature-too-high', async () => {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/apps/pediatric/eos/');

  // waiting for terms popup
  await sleep(100);

  // Check if the modal exists
  const modal = await page.$('#usage-terms-dialog-backdrop');

  if (modal) {
    // Click the "I accept" button if the modal is present
    await page.click('#acceptTerms');
  }

  // Set fever 
  await page.focus('#temprature');
  await page.keyboard.type("41");
  // de-focus, to get the error msg
  await page.focus('#pregnancyLengthDays');
  value = await page.$eval('#temprature-error', el => el.textContent);
  expect(value).toEqual("המחשבון מתייחס לחום בטווח 36-40 בלבד.");
  await browser.close();
});

test('eos-e2e-pregnancy-week-too-high', async () => {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/apps/pediatric/eos/');

  // waiting for terms popup
  await sleep(100);

  // Check if the modal exists
  const modal = await page.$('#usage-terms-dialog-backdrop');

  if (modal) {
    // Click the "I accept" button if the modal is present
    await page.click('#acceptTerms');
  }

  // Set fever 
  await page.focus('#pregnancyLengthWeeks');
  await page.keyboard.type("44");
  // de-focus, to get the error msg
  await page.focus('#pregnancyLengthDays');
  value = await page.$eval('#pregnancyWeeks-error', el => el.textContent);
  expect(value).toEqual("המחשבון מתייחס רק לשבועות 34 עד 43.");
  await browser.close();
});

test('eos-e2e-pregnancy-week-too-low', async () => {
  const browser = await puppeteer.launch({ headless: true, devtools: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/apps/pediatric/eos/');

  // waiting for terms popup
  await sleep(100);

  // Check if the modal exists
  const modal = await page.$('#usage-terms-dialog-backdrop');

  if (modal) {
    // Click the "I accept" button if the modal is present
    await page.click('#acceptTerms');
  }

  // Set fever 
  await page.focus('#pregnancyLengthWeeks');
  await page.keyboard.type("33");
  // de-focus, to get the error msg
  await page.focus('#pregnancyLengthDays');
  value = await page.$eval('#pregnancyWeeks-error', el => el.textContent);
  expect(value).toEqual("המחשבון מתייחס רק לשבועות 34 עד 43.");
  await browser.close();
});