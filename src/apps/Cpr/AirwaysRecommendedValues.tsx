import airwaysData from '../Resus/data/airways.json';
import React, { useEffect, useState } from 'react';
import { useResusContext } from '../Resus/ResusContext';
import './AirwaysRecommendedValues.css';

interface AirwaysForAge {
  blade: number;
  cuffedETT: number;
  ETT: number;
  lma: number;
}

const AirwaysRecommendedValues: React.FC = () => {
  const { age, weight } = useResusContext();
  const [airwaysForAge, setAirwaysForAge] = useState<AirwaysForAge>({} as AirwaysForAge);

  const getChestTubeSize = (weight: number): string => {
    if (weight < 5) return "8-12";
    if (weight <= 10) return "10-14";
    if (weight <= 15) return "14-20";
    if (weight <= 20) return "20-24";
    if (weight <= 30) return "20-28";
    if (weight <= 50) return "28-40";
    return "32-40";
  };
 
  useEffect(() => {
    if (age && airwaysData.dataByAge) {
      const currData = airwaysData.dataByAge.find((data: any) => data.age === age);
      if (currData) {
        setAirwaysForAge(currData);
      }
    } else {
      setAirwaysForAge({} as AirwaysForAge);
    }
  }, [age, airwaysData]);

  return (
    <div className="airways-recommendations">
      <h5 className="airways-title">ערכים מומלצים לפי גיל:</h5>
      <ul className="airways-list">
        <span className="defi-data">Laryngiscope blade: {airwaysForAge.blade}</span><br />
        <span className="defi-data">ETT diameter (Cuffed): {airwaysForAge.cuffedETT}</span><br />
        <span className="defi-data">ETT diameter: {airwaysForAge.ETT}</span><br />
        <span className="defi-data">LMA Size: {airwaysForAge.lma}</span><br />
        {weight && <span className="defi-data">Chest tube size (Fr): {getChestTubeSize(weight)}</span>}
      </ul>
    </div>
  );
};

export default AirwaysRecommendedValues;