import airwaysData from './data/airways.json';
import React, { useEffect, useState } from 'react';
import { useResusContext } from './ResusContext';

interface AirwaysForAge {
  blade: number;
  cuffedETT: number;
  lma: number;
}

const AirwaysAndDefibrillator: React.FC = () => {
  const { age, weight } = useResusContext();
  const [airwaysForAge, setAirwaysForAge] = useState<AirwaysForAge>({} as AirwaysForAge);
  
 const getDefi = (multiplier: number): number => {
    return weight ? Math.min(multiplier * weight, 200) : 0;
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
    </div>
  );
};

export default AirwaysAndDefibrillator;