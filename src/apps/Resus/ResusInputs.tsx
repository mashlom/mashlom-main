import React, { useState, useEffect } from 'react';
import { FaWeightScale } from 'react-icons/fa6';
import Image from '../../components/Image';
import { useResusContext } from './ResusContext';
import airwaysDataFile from './data/airways.json';
import './ResusInputs.css';

interface AgeOption {
  label: string;
  value: string;
}

const ResusInputs: React.FC = () => {
  const { age, weight, updateContext, resetContext } = useResusContext();
  const [localAge, setLocalAge] = useState(age);
  const [localWeight, setLocalWeight] = useState(weight);
  const [estimatedMaleWeight, setEstimatedMaleWeight] = useState<string>('');
  const [estimatedFemaleWeight, setEstimatedFemaleWeight] = useState<string>('');
  const [agesForDropDown, setAgesForDropDown] = useState<AgeOption[]>([]);
  const [estimatedWeightByAge, setEstimatedWeightByAge] = useState<Record<string, { male: string; female: string }>>({});
  const [isExpanded, setIsExpanded] = useState(!age || !weight);

  useEffect(() => {
    const fetchData = () => {
      try {
        parseRawDataToEstimatedWeights(airwaysDataFile);
        createDropDownData(airwaysDataFile);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLocalAge(age);
    setLocalWeight(weight);
    setIsExpanded(!age || !weight);
  }, [age, weight]);

  useEffect(() => {
    if (localAge && estimatedWeightByAge[localAge]) {
      setEstimatedMaleWeight(estimatedWeightByAge[localAge].male);
      setEstimatedFemaleWeight(estimatedWeightByAge[localAge].female);
    } else {
      setEstimatedMaleWeight('');
      setEstimatedFemaleWeight('');
    }
  }, [localAge, estimatedWeightByAge]);

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

  const applyMaleWeightRounded = () => setLocalWeight(Math.round(Number(estimatedMaleWeight)).toString());
  const applyFemaleWeightRounded = () => setLocalWeight(Math.round(Number(estimatedFemaleWeight)).toString());

  const shouldWarnOnWeight = (): boolean => {
    if (localAge && localWeight && estimatedFemaleWeight) {
      return Number(localWeight) > 2.5 * Number(estimatedFemaleWeight);
    }
    return false;
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(',', '.');
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setLocalWeight(value);
    }
  };

  const handleUpdate = () => {
    updateContext(localAge, localWeight);
    setIsExpanded(false);
  };

  const handleReset = () => {
    resetContext();
    setIsExpanded(true);
  };

  const isUpdateDisabled = !localAge || !localWeight;
  const isClearDisabled = !localAge && !localWeight;

  return (
    <div className="resus-inputs-container">
      <div className={`resus-inputs-collapsed ${!isExpanded ? 'visible' : ''}`}>
        <div className="collapsed-content">
          <span style={{fontWeight: "bold"}}>גיל: {age}, משקל: {weight} ק"ג</span>
          <div className="collapsed-buttons">
            <a href="#" className="edit-button" onClick={(e) => { e.preventDefault(); setIsExpanded(true); }}>ערוך</a>
          </div>
        </div>
        <Image
          src="refresh.png"
          alt="reset"
          className="resus-reset-button"
          onClick={handleReset}
        />
      </div>
      <div className={`resus-inputs-expanded ${isExpanded ? 'visible' : ''}`} style={{backgroundColor: "white"}}>
        <form style={{marginBottom:"15px"}}>
          <div className="container" style={{ textAlign: 'right' }}>
            <div className="row form-group">
              <div className="col-auto fs-4 col-auto-text-cols">
                גיל
              </div>
              <div className="col input-col">
                <select className="form-control" onChange={(e) => setLocalAge(e.target.value)} value={localAge}>
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
              {localAge && (
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
                  pattern="[0-9]*[.,]?[0-9]*"
                  maxLength={7}
                  style={{ maxWidth: '90px' }}
                  className="form-control"
                  id="weight"
                  value={localWeight}
                  onChange={handleWeightChange}
                />
              </div>
            </div>
            {shouldWarnOnWeight() && (
              <div className="row form-group">
                <span style={{ color: 'red' }}><b>המשקל חורג באופן משמעותי מהממוצע לגיל.</b></span>
              </div>
            )}
            <div className="row form-group">
              <div className="col text-center">
                <button
                  type="button"
                  className="btn btn-update"
                  style={{marginLeft: "15px"}}
                  onClick={handleUpdate}
                  disabled={isUpdateDisabled}
                >
                  עדכן
                </button>
                <button
                  type="button"
                  className="btn btn-update"
                  onClick={handleReset}
                  disabled={isClearDisabled}
                >
                  נקה
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResusInputs;