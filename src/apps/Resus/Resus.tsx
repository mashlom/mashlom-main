import React, { useState, useEffect } from 'react';
import './Resus.css';
import '../AppStyle.css';
import Drugs from './Drugs';
import Drips from './Drips';
import drugsDataFile from './data/resus-drugs-definitions.json';
import airwaysDataFile from './data/airways.json';
import Image from '../../components/Image';
import { FaWeightScale } from 'react-icons/fa6';

interface DrugDefinition {
  drug_name: string;
  dosage: string;
  medical_concentration: string;
  max_dose: string;
}

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
        createDrugDefinitions(drugsDataFile);
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

  const createDrugDefinitions = (data: any): DrugDefinition[] => {
    return data.sections.flatMap((category: any) => 
      category.drugs.map((drug: any) => ({
        drug_name: `${drug.name} ${drug.howToGive}`,
        dosage: `${drug.dose_per_kg} ${drug.dose_unit}`,
        medical_concentration: drug.concentration ? `${drug.concentration} ${drug.dose_unit}/ml` : "",
        max_dose: drug.maxDose ? `${drug.maxDose} ${drug.maxDoseUnit}` : ""
      }))
    );
  };

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

  const getDefi = (multiplier: number): number => {
    return Math.min(multiplier * Number(weight), 200);
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
    <div className="container main-content">
      <div className="group-container">
        <form>
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
            <div className="cards-container row row-cols-1 row-cols-md-1 g-4">
              <div className="col">
                <div className="card">
                  <div className="card-body row">
                    <div className="col-md-6" style={{ paddingTop: '10px' }}>
                      <h5 className="card-title" style={{ fontWeight: 'bold' }}>Airways</h5>
                      <ul className="list-group" style={{ backgroundColor: '#B9EDE7', borderRadius: '10px', padding: '15px', lineHeight: '1rem' }}>
                        <span className="defi-data">Laryngiscope blade: {airwaysForAge.blade}</span><br />
                        <span className="defi-data">ETT diameter (Cuffed): {airwaysForAge.cuffedETT}</span><br />
                        <span className="defi-data">LMA Size: {airwaysForAge.lma}</span>
                      </ul>
                    </div>
                    <div className="col-md-6" style={{ paddingTop: '10px' }}>
                      <h5 className="card-title" style={{ fontWeight: 'bold' }}>Defibrillator</h5>
                      <ul className="list-group" style={{ backgroundColor: '#B9EDE7', borderRadius: '10px', padding: '15px', lineHeight: '1rem' }}>
                        <span className="defi-data">{getDefi(2)} (2J/Kg)</span><br />
                        <span className="defi-data">{getDefi(4)} (4J/Kg)</span>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <Drugs weight={Number(weight)}></Drugs>
              <Drips weight={Number(weight)} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Resus;