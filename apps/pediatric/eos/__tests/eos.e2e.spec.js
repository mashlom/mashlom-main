const puppeteer = require('puppeteer');
const testCases = require('./testCases')

const LIGHT_TREATMENT = {
  NO_NEED_CARE: 'לא נדרש טיפול באור',
  NEED_CARE: 'נדרש טיפול באור',
  ALERT: 'ערך בילירובין מתקרב לסף טיפול באור'
}

const BLOOD_TRANSFUSION = {
  ALERT: 'ערך בילירובין מתקרב לסף החלפת דם',
  NEED: 'עובר את סף החלפת דם',
  IVIG: 'ערך בילירובין מתקרב לסף החלפת דם, יש לשקול מתן IVIG',
  NEED_UNDER_SIX: 'עובר את סף החלפת דם (בילירובין גדול מגיל הילד)'
}

const transfusionNameToId = {
  [BLOOD_TRANSFUSION.ALERT]: 'התראה',
  [BLOOD_TRANSFUSION.NEED]: 'עובר',
  [BLOOD_TRANSFUSION.IVIG]: 'התראה IVIG',
  [BLOOD_TRANSFUSION.NEED_UNDER_SIX]: 'עובר גדול מגיל ילוד'
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
  const eosStat = Number(eosRaw.trim());
  await browser.close();

  return { eosStat };
}

describe('eos-e2e', () => {
  jest.setTimeout(5000);
  it.each(testCases)(
    "test case %o",
    async ({ fever, birthWeek, plusDays, rom, gbs, antibiotics, expectedResult }) => {
      const { eosStat } = await getEosResult(fever, birthWeek, plusDays, rom, gbs, antibiotics);
      expect(eosStat).toEqual(expectedResult.eosStat)
    }
  );
});
