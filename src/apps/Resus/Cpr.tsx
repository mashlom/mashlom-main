import React, { useState, useEffect } from 'react';
import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';
import airwaysDataFile from './data/airways.json';
import { useResusContext } from './ResusContext';

interface AirwaysForAge {
  blade: string;
  cuffedETT: string;
  lma: string;
}

const Cpr: React.FC = () => {
  const { age, weight } = useResusContext();
  const [airwaysData, setAirwaysData] = useState<any>({});
  const [airwaysForAge, setAirwaysForAge] = useState<AirwaysForAge>({} as AirwaysForAge);

  useEffect(() => {
    setAirwaysData(airwaysDataFile);
  }, []);

  useEffect(() => {
    if (age !== null && airwaysData.dataByAge) {
      const currData = airwaysData.dataByAge.find((data: any) => data.age === age.toString());
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