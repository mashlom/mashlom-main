import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { ClinicalRecommendation } from './ClinicalRecommendation';

export const EosCalculator: React.FC = () => {
  const [temperature, setTemperature] = useState<string>('');
  const [pregnancyLengthWeeks, setPregnancyLengthWeeks] = useState<string>('');
  const [pregnancyLengthDays, setPregnancyLengthDays] = useState<string>('');
  const [rom, setRom] = useState<string>('');
  const [gbs, setGbs] = useState<'positive' | 'negative' | 'unknown'>(
    'unknown'
  );
  const [antibioticTreatment, setAntibioticTreatment] = useState<string>('');
  const [temperatureValidity, setTemperatureValidity] = useState<boolean>(true);
  const [pregnancyWeekValidity, setPregnancyWeekValidity] =
    useState<boolean>(true);
  const [eosString, setEosString] = useState<string>('');
  const [eosPerClinicalCondition, setEosPerClinicalCondition] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    computeEOS();
  }, [
    temperature,
    pregnancyLengthWeeks,
    pregnancyLengthDays,
    rom,
    gbs,
    antibioticTreatment,
  ]);

  const checkTemperature = () => {
    const temp = parseFloat(temperature);
    setTemperatureValidity(temp >= 36 && temp <= 40);
  };

  const checkPregnancyLength = () => {
    const weeks = parseInt(pregnancyLengthWeeks, 10);
    setPregnancyWeekValidity(weeks >= 34 && weeks <= 43);
  };

  const computeEOS = () => {
    // Implement the EOS computation logic here
    // This is a placeholder and should be replaced with the actual logic
    setEosString('0.5');
    setEosPerClinicalCondition({
      'Well Appearing': '0.4',
      Equivocal: '0.7',
      'Clinical Illness': '1.0',
    });
  };

  const getClinicalConditionColor = (condition: string) => {
    console.log(condition);
    // Implement the logic to determine the color based on the condition
    // This is a placeholder and should be replaced with the actual logic
    return 'green';
  };

  const getClinicalRecommendation = (condition: string) => {
    console.log(condition);
    // Implement the logic to get the clinical recommendation
    // This is a placeholder and should be replaced with the actual logic
    return 'Placeholder recommendation';
  };

  const getTrackingRecommendation = (condition: string) => {
    console.log(condition);
    // Implement the logic to get the tracking recommendation
    // This is a placeholder and should be replaced with the actual logic
    return 'Placeholder tracking recommendation';
  };

  const resetAll = () => {
    setTemperature('');
    setPregnancyLengthWeeks('');
    setPregnancyLengthDays('');
    setRom('');
    setGbs('unknown');
    setAntibioticTreatment('');
    setTemperatureValidity(true);
    setPregnancyWeekValidity(true);
    setEosString('');
    setEosPerClinicalCondition({});
  };

  return (
    <div
      id="calculator"
      style={{ overflowY: 'auto', overflowX: 'hidden', paddingBottom: '10px' }}
    >
      <div className="group-container">
        <div>
          <div className="row form-group">
            <div className="col-auto fs-3">
              <h1>
                {' '}
                אלח דם{' '}
                <span style={{ fontSize: '1.05rem' }}>
                  (Early-Onset Sepsis)
                </span>
              </h1>
            </div>
            <div className="col-auto me-auto reset-button">
              <span onClick={resetAll}>
                <img
                  style={{
                    cursor: 'pointer',
                    width: '35px',
                    height: '35px',
                    marginRight: '10px',
                  }}
                  src="../../assets/refresh.png"
                  alt="Reset"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row form-group">
            <div className="col-auto caption-fs col-auto-text-cols d-flex align-items-center">
              חום אימהי מקסימלי:
            </div>
            <div className="col input-col">
              <input
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                onBlur={checkTemperature}
                inputMode="decimal"
                type="text"
                pattern="[0-9]{1,4}[,.]{0,1}[0-9]{0,1}"
                maxLength={5}
                style={{ maxWidth: '90px' }}
                className="form-control"
                id="temperature"
                max={40}
                min={36}
              />
            </div>
            {!temperatureValidity && (
              <span id="temperature-error" style={{ color: 'red' }}>
                המחשבון מתייחס לחום בטווח 36-40 בלבד.
              </span>
            )}
          </div>
          <div className="row form-group">
            <div className="col-auto caption-fs col-auto-text-cols d-flex align-items-center">
              משך הריון:
            </div>
            <div className="col input-col">
              <div className="row">
                <div
                  className="col-5 col-md-3"
                  style={{
                    paddingLeft: '0px',
                    marginLeft: '10px',
                    maxWidth: '100px',
                  }}
                >
                  <input
                    placeholder="שבועות"
                    value={pregnancyLengthWeeks}
                    onChange={(e) => setPregnancyLengthWeeks(e.target.value)}
                    onBlur={checkPregnancyLength}
                    inputMode="decimal"
                    type="text"
                    pattern="[0-9]{0,3}"
                    min={34}
                    max={43}
                    maxLength={3}
                    style={{ maxWidth: '90px', minWidth: '50px' }}
                    className="form-control"
                    id="pregnancyLengthWeeks"
                  />
                </div>
                <div
                  className="col-5 col-md-3"
                  style={{ paddingRight: '0px', maxWidth: '100px' }}
                >
                  <input
                    placeholder="+ ימים"
                    value={pregnancyLengthDays}
                    onChange={(e) => setPregnancyLengthDays(e.target.value)}
                    inputMode="decimal"
                    type="text"
                    pattern="[0-6]{0,1}"
                    max={6}
                    min={0}
                    maxLength={3}
                    style={{ maxWidth: '90px', minWidth: '50px' }}
                    className="form-control"
                    id="pregnancyLengthDays"
                  />
                </div>
              </div>
              {!pregnancyWeekValidity && (
                <span id="pregnancyWeeks-error" style={{ color: 'red' }}>
                  המחשבון מתייחס רק לשבועות 34 עד 43.
                </span>
              )}
            </div>
          </div>
          <div className="row form-group">
            <div className="col-auto caption-fs col-auto-text-cols d-flex align-items-center">
              משך פקיעת הקרומים:
            </div>
            <div className="col input-col">
              <input
                placeholder="שעות"
                value={rom}
                onChange={(e) => setRom(e.target.value)}
                inputMode="decimal"
                type="text"
                pattern="[0-9]{1,4}[,.]{0,1}[0-9]{0,1}"
                maxLength={4}
                style={{ maxWidth: '90px' }}
                className="form-control"
                id="rom"
                max={150}
                min={0}
              />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-auto caption-fs col-auto-text-cols d-flex align-items-center">
              סטטוס GBS:
            </div>
            <div className="col input-col" style={{ maxWidth: '200px' }}>
              <select
                className="form-select"
                id="gbs"
                value={gbs}
                onChange={(e) =>
                  setGbs(e.target.value as 'positive' | 'negative' | 'unknown')
                }
              >
                <option value="positive">חיובי</option>
                <option value="negative">שלילי</option>
                <option value="unknown">לא ידוע</option>
              </select>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-auto caption-fs col-auto-text-cols d-flex align-items-center">
              טיפול אנטיביוטי בלידה:{' '}
              <i
                className="fa-solid fa-circle-question"
                style={{ marginRight: '10px' }}
                data-bs-toggle="modal"
                data-bs-target="#infoAntibiotics"
              ></i>
            </div>
          </div>
          <div className="row form-group">
            <div className="col input-col">
              <div className="row mb-2">
                <div className="col-auto d-flex align-items-center">
                  <input
                    className="form-check-input custom-radio"
                    type="radio"
                    id="broad-4"
                    checked={antibioticTreatment === 'broad-4'}
                    onChange={() => setAntibioticTreatment('broad-4')}
                  />
                </div>
                <div className="col">
                  <label className="form-check-label" htmlFor="broad-4">
                    אנטיביוטיקה רחבת טווח מעל 4 שעות לפני הלידה
                  </label>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-auto d-flex align-items-center">
                  <input
                    className="form-check-input custom-radio"
                    type="radio"
                    id="broad-2"
                    checked={antibioticTreatment === 'broad-2'}
                    onChange={() => setAntibioticTreatment('broad-2')}
                  />
                </div>
                <div className="col">
                  <label className="form-check-label" htmlFor="broad-2">
                    אנטיביוטיקה רחבת טווח 2 עד 3.9 שעות לפני הלידה
                  </label>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-auto d-flex align-items-center">
                  <input
                    className="form-check-input custom-radio"
                    type="radio"
                    id="GBS-2"
                    checked={antibioticTreatment === 'GBS-2'}
                    onChange={() => setAntibioticTreatment('GBS-2')}
                  />
                </div>
                <div className="col">
                  <label className="form-check-label" htmlFor="GBS-2">
                    אנטיביוטיקה ספציפית ל-GBS מעל שעתיים לפני הלידה
                  </label>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-auto d-flex align-items-center">
                  <input
                    className="form-check-input custom-radio"
                    type="radio"
                    id="none"
                    checked={antibioticTreatment === 'none'}
                    onChange={() => setAntibioticTreatment('none')}
                  />
                </div>
                <div className="col">
                  <label className="form-check-label" htmlFor="none">
                    ללא טיפול אנטיביוטי, או טיפול אנטיביוטי פחות משעתיים לפני
                    הלידה
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {eosString && (
        <div id="result">
          <div className="cards-container row row-cols-1 row-cols-md-1 g-4">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div
                    id="eos"
                    className="card-title"
                    style={{ textAlign: 'center' }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>
                      סיכון לאלח דם מוקדם:
                    </span>
                    <span
                      style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                      id="eosStatistics"
                    >
                      {' '}
                      {eosString}{' '}
                    </span>
                    <span style={{ fontSize: '1.1rem' }}>לאלף לידות</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <div
              className="accordion"
              id="accordionExample"
              style={{ width: '100%' }}
            >
              <div className="card">
                <div
                  className={`card-header collapse-item position-relative ${getClinicalConditionColor(
                    'Well Appearing'
                  )}`}
                  id="headingOne"
                >
                  <h5 className="mb-0">
                    <button
                      className="btn collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <b>תינוקות אסימפטומטיים (Well Appearing)</b>
                      <ul>
                        <li>
                          סיכון של{' '}
                          <span id="wellAppearingEos">
                            {eosPerClinicalCondition['Well Appearing']}
                          </span>{' '}
                          לאלף לידות
                        </li>
                        <li>{getClinicalRecommendation('Well Appearing')}</li>
                        <li>{getTrackingRecommendation('Well Appearing')}</li>
                      </ul>
                    </button>
                    <i
                      className="fa-solid fa-circle-info icon"
                      data-bs-toggle="modal"
                      data-bs-target="#infoModal1"
                    ></i>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body">
                    <ClinicalRecommendation condition="Well Appearing" />
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className={`card-header collapse-item position-relative ${getClinicalConditionColor(
                    'Equivocal'
                  )}`}
                  id="headingTwo"
                >
                  <h5 className="mb-0">
                    <button
                      className="btn collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <b>
                        תינוקות עם סימפטומים לא ספציפיים לאלח-דם (Equivocal)
                      </b>
                      <ul>
                        <li>
                          סיכון של{' '}
                          <span id="equivocalEos">
                            {eosPerClinicalCondition['Equivocal']}
                          </span>{' '}
                          לאלף לידות
                        </li>
                        <li>{getClinicalRecommendation('Equivocal')}</li>
                        <li>{getTrackingRecommendation('Equivocal')}</li>
                      </ul>
                    </button>
                    <i
                      className="fa-solid fa-circle-info icon"
                      data-bs-toggle="modal"
                      data-bs-target="#infoModal2"
                    ></i>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body">
                    <ClinicalRecommendation condition="Equivocal" />
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className={`card-header collapse-item position-relative ${getClinicalConditionColor(
                    'Clinical Illness'
                  )}`}
                  id="headingThree"
                >
                  <h5 className="mb-0">
                    <button
                      className="btn collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <b>תינוקות עם סימנים משמעותיים (Clinical Illness)</b>
                      <ul>
                        <li>
                          סיכון של{' '}
                          <span id="clinicalIllnessEos">
                            {eosPerClinicalCondition['Clinical Illness']}
                          </span>{' '}
                          לאלף לידות
                        </li>
                        <li>{getClinicalRecommendation('Clinical Illness')}</li>
                        <li>{getTrackingRecommendation('Clinical Illness')}</li>
                      </ul>
                    </button>
                    <i
                      className="fa-solid fa-circle-info icon"
                      data-bs-toggle="modal"
                      data-bs-target="#infoModal3"
                    ></i>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body">
                    <ClinicalRecommendation condition="Clinical Illness" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* </div> */}
      {/* </div> */}
      {/* Implement the results section here */}
      <Modal id="infoModal1" title="תינוקות אסימפטומטיים">
        <p>תינוקות עם בדיקה גופנית תקינה.</p>
      </Modal>

      <Modal id="infoModal2" title="תינוקות עם סימפטומים לא ספציפיים לאלח-דם">
        <div>
          הפרעה בודדת שהנמשכת מעלה 4 שעות :
          <ul>
            <li>טכיקרדיה: דופק {'>'}.160</li>
            <li>טכיפניאה: נשימות {'>'}.60</li>
            <li>חוסר יציבות בחום הגוף: חום פחות מ-C.36.4</li>
            <li>
              סימני מצוקה נשימתית (אנחות, רתיעות בין צלעיות, נשימת כנפי אף) ללא
              צורך בתוספת חמצן.
            </li>
          </ul>
          <b>או</b>
          <br />
          <br />
          הפרעה בשני סימנים או יותר שנמשכים יותר משעתיים:
          <ul>
            <li>טכיקרדיה: דופק {'>'}160</li>
            <li>טכיפניאה: נשימות {'>'}60</li>
            <li>חוסר יציבות בחום הגוף: חום פחות מ-C.36.4</li>
            <li>
              סימני מצוקה נשימתית (אנחות, רתיעות בין - צלעיות, נשימת כנפי אף)
              ללא צורך בתוספת חמצן.
            </li>
          </ul>
        </div>
      </Modal>

      <Modal id="infoModal3" title="תינוקות עם סימנים משמעותיים">
        <ul>
          <li>
            צורך בהמשך תמיכה נשימתית פולשנית או לא פולשנית מחוץ לחדר לידה/ חדר
            ניתוח
          </li>
          <li>חוסר יציבות המודינמית, כולל צורך בטיפול תרופתי</li>
          <li>
            מצב נוירולוגי לא תקין: אנצפלופטיה בילוד, היפוטוניה, חוסר תגובה
            לגירוי, או פרכוסים
          </li>
          <li>אפגר נמוך מ5 בגיל 5 דקות</li>
          <li>
            צורך בהעשרת חמצן למשך יותר משעתיים לאחר הלידה לשמירה על ריווי חמצן
            מעל 90%
          </li>
          <li>חום גוף התינוק מעל 38.0</li>
        </ul>
      </Modal>

      <Modal id="infoAntibiotics" title="הטיפול אנטיביוטי">
        <ul>
          <li>
            במידה והאם קבלה כיסוי טרום לידתי עם אמפיצילין וגנטאמיצין (טיפול
            משולב) או צפטריאקסון בלבד יש להזין שניתנה אנטיביוטיקה רחבת טווח לאם
            תוך התייחסות למספר שעות טרם לידה שהטיפול ניתן.
          </li>
          <li>
            אם האם קבלה טיפול מסוג beta Lactams - להזין "אנטיביוטיקה ספציפית
            ל-GBS", במידה וניתן לפחות שעתיים טרם הלידה (בקבוצה זו כלולים:
            פניצילין, אמפיצילין, צפאזולין).
          </li>
          <li>
            אם היולדת לא קיבלה תכשירים מסוג beta Lactams (פניצילין, אמפיצילין,
            צפאזולין) יש לבחור באפשרות "ללא טיפול אנטיביוטי". קלינדאמיצין
            וונקומיצין אינם נחשבים כיסוי אנטיביוטי הולם.
          </li>
          <li>
            אם היולדת קיבלה כיסוי אנטיביוטי כלשהו פחות משעתיים טרם הלידה יש
            לבחור באפשרות "ללא טיפול אנטיביוטי".
          </li>
        </ul>
      </Modal>
    </div>
  );
};
