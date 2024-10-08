import React, { useState, useEffect } from 'react';
import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';
import airwaysDataFile from './data/airways.json';

interface CprProps {
  weight: number;
  age: string;
}

interface AirwaysForAge {
  blade: string;
  cuffedETT: string;
  lma: string;
}

const Cpr: React.FC<CprProps> = ({ weight, age }) => {
  const [airwaysData, setAirwaysData] = useState<any>({});
  const [airwaysForAge, setAirwaysForAge] = useState<AirwaysForAge>({} as AirwaysForAge);

  useEffect(() => {
    setAirwaysData(airwaysDataFile);
  }, []);

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
    <div>
      {weight > 0 && age && (
        <AirwaysAndDefibrillator airwaysForAge={airwaysForAge} weight={weight} />
      )}
      {/* Add other CPR-related content here */}
    </div>
  );
};

export default Cpr;