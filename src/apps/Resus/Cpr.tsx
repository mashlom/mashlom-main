import React from 'react';
import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';
import { useResusContext } from './ResusContext';


const Cpr: React.FC = () => {
  const { age, weight } = useResusContext();

  return (
    <div>
      {weight !== null && weight > 0 && age && (
        <AirwaysAndDefibrillator/>
      )}
      {/* Add other CPR-related content here */}
    </div>
  );
};

export default Cpr;