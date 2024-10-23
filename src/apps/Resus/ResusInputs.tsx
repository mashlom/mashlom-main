import React, { useState, useEffect } from 'react';
import { FaWeightScale } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import Image from '../../components/Image';
import { useResusContext } from './ResusContext';
import airwaysDataFile from './data/airways.json';
import emergencyProtocols from './data/emergency-protocols.json';
import './ResusInputs.css';

interface AgeOption {
  label: string;
  value: string;
}

interface ProtocolOption {
  label: string;
  value: string;
  section: string;
}

export interface ProtocolData {
  name: string;
  id: string;
  algorithmFile?: string;
  protocolFile?: string;
};

const ResusInputs: React.FC = () => {
  const { age, weight, updateContext, resetContext, protocol } = useResusContext();
  const [localAge, setLocalAge] = useState(age);
  const [localProtocol, setLocalProtocol] = useState(protocol);
  const [localWeight, setLocalWeight] = useState(weight !== null ? weight.toString() : '');
  const [estimatedMaleWeight, setEstimatedMaleWeight] = useState<string>('');
  const [estimatedFemaleWeight, setEstimatedFemaleWeight] = useState<string>('');
  const [agesForDropDown, setAgesForDropDown] = useState<AgeOption[]>([]);
  const [protocolsForDropDown, setProtocolsForDropDown] = useState<ProtocolOption[]>([]);
  const [estimatedWeightByAge, setEstimatedWeightByAge] = useState<Record<string, { male: string; female: string }>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  
  const location = useLocation();
  const currentPath = location.pathname;

  const isProtocolsPage = currentPath.includes('/resus/protocols');
  const isMedsPage = currentPath.includes('/resus/meds');
  const isCprPage = currentPath.includes('/resus/cpr');
  
  const [isExpanded, setIsExpanded] = useState(age === '' || weight === null || (isProtocolsPage && !protocol));

  const getMandatoryFields = () => {
    if (isProtocolsPage) return { weight: true, age: true, protocol: true };
    if (isMedsPage) return { weight: true, age: false, protocol: false };
    if (isCprPage) return { weight: true, age: true, protocol: false };
    return { weight: false, age: false, protocol: false };
  };

  const mandatoryFields = getMandatoryFields();

  const isFieldInvalid = (field: 'weight' | 'age' | 'protocol') => {
    if (!mandatoryFields[field]) return false;
    if (!hasAttemptedSubmit) return false;

    switch (field) {
      case 'weight': return !localWeight;
      case 'age': return !localAge;
      case 'protocol': return !localProtocol;
    }
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        parseRawDataToEstimatedWeights(airwaysDataFile);
        createDropDownData(airwaysDataFile);
        createProtocolsDropDown();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLocalAge(age);
    setLocalProtocol(protocol);
    setLocalWeight(weight !== null ? weight.toString() : '');
    setIsExpanded(age === '' || weight === null || (isProtocolsPage && !protocol));
  }, [age, weight, protocol, isProtocolsPage]);

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
  
  const createProtocolsDropDown = () => {
    const protocols: ProtocolOption[] = [];
    emergencyProtocols.emergencyProtocols.forEach(section => {
      protocols.push({ label: section.section, value: '', section: section.section });
      section.protocols.forEach(p => {
        const protocol = p as ProtocolData;
        if (protocol.algorithmFile || protocol.protocolFile){
          protocols.push({
            label: protocol.name,
            value: protocol.id,
            section: section.section
          });
        }
      });
    });
    setProtocolsForDropDown(protocols);
  };

  const formatAge = (age: string): string => {
    if (age === "0 month") return "בן יומו";
    if (age === "1 month") return "חודש";
    if (age === "2 month") return "חודשיים";
    if (age === "1 year") return "שנה";
    if (age === "2 year") return "שנתיים";
    return age.replace("month", "חודשים").replace("year", "שנים");
  };

  const getFormattedAge = (age: string): string => {
    const option = agesForDropDown.find(opt => opt.value === age);
    return option ? option.label : age;
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
    setHasAttemptedSubmit(true);
    
    const isMissingMandatoryFields = 
      (mandatoryFields.weight && !localWeight) ||
      (mandatoryFields.age && !localAge) ||
      (mandatoryFields.protocol && !localProtocol);

    if (!isMissingMandatoryFields) {
      updateContext(localAge, localWeight ? parseFloat(localWeight) : null, localProtocol);
      setIsExpanded(false);
      setHasAttemptedSubmit(false);
    }
  };

  const handleReset = () => {
    resetContext();
    setIsExpanded(true);
    setHasAttemptedSubmit(false);
  };

  return (
    <div className="resus-inputs-container">
      <div className={`resus-inputs-collapsed ${!isExpanded ? 'visible' : ''}`}>
        <div className="collapsed-content">
          <span style={{fontWeight: "bold"}}>גיל: {getFormattedAge(age)}, משקל: {weight} ק"ג</span>
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
                פרוטוקול
              </div>
              <div className="col input-col">
                <select 
                  className={`form-control ${isFieldInvalid('protocol') ? 'border-danger' : ''}`}
                  onChange={(e) => setLocalProtocol(e.target.value)} 
                  value={localProtocol || ""}
                >
                  <option value="">- לא נבחר פרוטוקול -</option>
                  {protocolsForDropDown.map((item, index) => (
                    item.value === '' ? (
                      <optgroup key={index} label={item.label}>
                      </optgroup>
                    ) : (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    )
                  ))}
                </select>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-auto fs-4 col-auto-text-cols">
                גיל
              </div>
              <div className="col input-col">
                <select 
                  className={`form-control ${isFieldInvalid('age') ? 'border-danger' : ''}`}
                  onChange={(e) => setLocalAge(e.target.value)} 
                  value={localAge}
                >
                  <option value="">בחר גיל</option>
                  {agesForDropDown.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {localAge && (<div className="row form-group">              
                <>
                  <div style={{ cursor: 'pointer' }}>
                    <FaWeightScale style={{ marginLeft: '10px' }} />
                    משקל משוערך בנים: {estimatedMaleWeight} ק"ג
                    <button 
                      type="button" 
                      className="btn btn-link ng-binding" 
                      onClick={applyMaleWeightRounded} 
                      style={{ paddingRight: '0.1rem' }}
                    >
                      (הזן ערך מעוגל)
                    </button>
                  </div>
                  <div style={{ cursor: 'pointer', paddingTop: '10px' }}>
                    <FaWeightScale style={{ marginLeft: '10px' }} />
                    משקל משוערך בנות: {estimatedFemaleWeight} ק"ג
                    <button 
                      type="button" 
                      className="btn btn-link ng-binding" 
                      onClick={applyFemaleWeightRounded} 
                      style={{ paddingRight: '0.1rem' }}
                    >
                      (הזן ערך מעוגל)
                    </button>
                  </div>
                </>
            </div>)}
            <div className="row form-group">
              <div className="col-auto fs-4 col-auto-text-cols">
                משקל (ק"ג)
              </div>
              <div className="col input-col">
                <input
                  type="text"
                  pattern="[0-9]*[.,]?[0-9]*"
                  maxLength={7}
                  style={{ maxWidth: '230px' }}
                  className={`form-control ${isFieldInvalid('weight') ? 'border-danger' : ''}`}
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
                >
                  עדכן
                </button>
                <button
                  type="button"
                  className="btn btn-update"
                  onClick={handleReset}
                >
                  נקה
                </button>
              </div>
            </div>
            {hasAttemptedSubmit && (
              mandatoryFields.weight && !localWeight ||
              mandatoryFields.age && !localAge ||
              mandatoryFields.protocol && !localProtocol
            ) && (
              <div className="row form-group">
                <div className="col text-center">
                  <span style={{ color: 'red' }}>נא מלא את שדות החובה</span>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResusInputs;