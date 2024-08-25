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
  await page.goto('http://localhost:8080/apps/pediatric/eos/');

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
  if (antibiotics === 'none') {
    noneRadio = await page.waitForSelector("#none");
  } else if (antibiotics === '4plus') {
    noneRadio = await page.waitForSelector("#broad-4");
  } else if (antibiotics === '4minus') {
    noneRadio = await page.waitForSelector("#broad-2");
  } else if (antibiotics === 'gps-specific') {
    noneRadio = await page.waitForSelector("#GBS-2");
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
  await browser.close();

  return { eosStat, wellAppearing };
}

describe('eos-e2e', () => {
  jest.setTimeout(5000);
  it.each(testCases)(
    "test case %o",
    async ({ fever, birthWeek, plusDays, rom, gbs, antibiotics, expectedResult }) => {
      const { eosStat, wellAppearing } = await getEosResult(fever, birthWeek, plusDays, rom, gbs, antibiotics);
      expect(eosStat).toEqual(expectedResult.eosStat)
      expect(wellAppearing).toEqual(expectedResult.wellAppearingSecondItem)

    }
  );
});
