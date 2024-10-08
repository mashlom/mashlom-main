import React from 'react';

interface AirwaysAndDefibrillatorProps {
  airwaysForAge: {
    blade: string;
    cuffedETT: string;
    lma: string;
  };
  weight: number;
}

const AirwaysAndDefibrillator: React.FC<AirwaysAndDefibrillatorProps> = ({ airwaysForAge, weight }) => {

 const getDefi = (multiplier: number): number => {
    return Math.min(multiplier * weight, 200);
    };
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