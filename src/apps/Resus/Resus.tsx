import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import './Resus.css';
import '../AppStyle.css';
import Meds from './Meds';
import Cpr from './Cpr';
import EmergencyProtocols from './EmergencyProtocols';
import airwaysDataFile from './data/airways.json';
import Image from '../../components/Image';
import { FaWeightScale } from 'react-icons/fa6';
import FooterNav from './ResusFooterNav';
import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';

interface AgeOption {
  label: string;
  value: string;
}

interface AirwaysForAge {
  blade: string;
  cuffedETT: string;
  lma: string;
}

const Resus: React.FC = () => {    
  const { hospital } = useParams<{ hospital: string }>();
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [agesForDropDown, setAgesForDropDown] = useState<AgeOption[]>([]);
  const [airwaysData, setAirwaysData] = useState<any>({}); // Consider creating a proper type for this
  const [airwaysForAge, setAirwaysForAge] = useState<AirwaysForAge>({} as AirwaysForAge);
  const [estimatedWeightByAge, setEstimatedWeightByAge] = useState<Record<string, { male: string; female: string }>>({});
  const [estimatedMaleWeight, setEstimatedMaleWeight] = useState<string>('');
  const [estimatedFemaleWeight, setEstimatedFemaleWeight] = useState<string>('');

  useEffect(() => {
    const fetchData = () => {
      try {
        setAirwaysData(airwaysDataFile);
        parseRawDataToEstimatedWeights(airwaysDataFile);
        createDropDownData(airwaysDataFile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (age && estimatedWeightByAge[age]) {
      setEstimatedMaleWeight(estimatedWeightByAge[age].male);
      setEstimatedFemaleWeight(estimatedWeightByAge[age].female);
  
      const currData = airwaysData.dataByAge.find((data: any) => data.age === age);
      if (currData) {
        setAirwaysForAge(currData);
      }
    } else {
      setEstimatedMaleWeight('');
      setEstimatedFemaleWeight('');
      setAirwaysForAge({} as AirwaysForAge);
    }
  }, [age, weight, estimatedWeightByAge, airwaysData]);

  const parseRawDataToEstimatedWeights = (data: any) => {
    const weightByAge: Record<string, { male: string; female: string }> = {};
    data.dataByAge.forEach(({ age, estimatedMaleWeight, estimatedFemaleWeight }: any) => {
      weightByAge[age] = { male: estimatedMaleWeight, female: estimatedFemaleWeight };
    });
    setEstimatedWeightByAge(weightByAge);
  };

  const createDropDownData = (data: any) => {
    const ages = data.dataByAge.map((item: any) => ({
      label: formatAge(item.age),
      value: item.age
    }));
    setAgesForDropDown(ages);
  };

  const formatAge = (age: string): string => {
    if (age === "0 month") return "בן יומו";
    if (age === "1 month") return "חודש";
    if (age === "2 month") return "חודשיים";
    if (age === "1 year") return "שנה";
    if (age === "2 year") return "שנתיים";
    return age.replace("month", "חודשים").replace("year", "שנים");
  };

  const applyMaleWeightRounded = () => setWeight(Math.round(Number(estimatedMaleWeight)).toString());
  const applyFemaleWeightRounded = () => setWeight(Math.round(Number(estimatedFemaleWeight)).toString());

  const shouldWarnOnWeight = (): boolean => {
    if (age && weight && estimatedFemaleWeight) {
      return Number(weight) > 2.5 * Number(estimatedFemaleWeight);
    }
    return false;
  };

  const allValuesSatisfied = (): boolean => Boolean(weight && age);

  const resetAll = () => {
    setWeight('');
    setAge('');
    setEstimatedMaleWeight('');
    setEstimatedFemaleWeight('');
  };

  return (
    <div>
      <div className="container main-content">
        <div className="group-container">
          <form style={{marginBottom:"15px"}}>
            <div>
              <div className="row form-group">
                <div className="col-auto fs-3" >
                  <h1>מינוני תרופות בעת החייאה</h1>
                </div>
                <div className="col-auto me-auto">
                  <span onClick={resetAll}>
                  <Image
                      src={`refresh.png`}
                      alt="reset button"
                      className="reset-button"
                      />                  
                  </span>
                </div>
              </div>
            </div>
            <div className="container" style={{ textAlign: 'right' }}>
              <div className="row form-group">
                <div className="col-auto fs-4 col-auto-text-cols">
                  גיל
                </div>
                <div className="col input-col">
                  <select className="form-control" onChange={(e) => setAge(e.target.value)} value={age}>
                    <option value="">בחר גיל</option>
                    {agesForDropDown.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row form-group">
                {age && (
                  <>
                    <div style={{ cursor: 'pointer' }}>
                    <FaWeightScale style={{ marginLeft: '10px' }} />
                      משקל משוערך בנים: {estimatedMaleWeight} ק"ג
                      <button type="button" className="btn btn-link ng-binding" onClick={applyMaleWeightRounded} style={{ paddingRight: '0.1rem' }}>
                        (הזן ערך מעוגל)
                      </button>
                    </div>
                    <div style={{ cursor: 'pointer', paddingTop: '10px' }}>
                      <FaWeightScale style={{ marginLeft: '10px' }} />
                      משקל משוערך בנות: {estimatedFemaleWeight} ק"ג
                      <button type="button" className="btn btn-link ng-binding" onClick={applyFemaleWeightRounded} style={{ paddingRight: '0.1rem' }}>
                        (הזן ערך מעוגל)
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="row form-group">
                <div className="col-auto fs-4 col-auto-text-cols">
                  משקל (ק"ג)
                </div>
                <div className="col input-col">
                  <input
                    type="text"
                    pattern="[0-9]{0,3}"
                    maxLength={4}
                    style={{ maxWidth: '90px' }}
                    className="form-control"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
              {shouldWarnOnWeight() && (
                <div className="row form-group">
                  <span style={{ color: 'red' }}><b>המשקל חורג באופן משמעותי מהממוצע לגיל.</b></span>
                </div>
              )}
            </div>
            {allValuesSatisfied() && (
              <AirwaysAndDefibrillator airwaysForAge={airwaysForAge} weight={Number(weight)} />
          )}
          </form>
          <Routes>
            <Route index element={<Navigate to="meds" replace />} />
            <Route path="meds" element={<Meds weight={Number(weight)} age={age} />} />
            <Route path="protocols" element={<EmergencyProtocols weight={Number(weight)} age={age} />} />
            <Route path="cpr" element={<Cpr weight={Number(weight)} age={age} />} />
          </Routes>          
        </div>
      </div>
      <FooterNav hospital={hospital || ''} />
    </div>
  );
};

export default Resus;