import React from 'react';
import Drugs from './Drugs';
import Drips from './Drips';

interface MedsProps {
  weight: number;
  age: string;
}

const Meds: React.FC<MedsProps> = ({ weight }) => {
  if (!weight) return null;
  return (
    <div>
      <Drugs weight={weight} />
      <Drips weight={weight} />
    </div>
  );
};

export default Meds;