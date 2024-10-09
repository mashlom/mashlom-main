import React from 'react';
import Drugs from './Drugs';
import Drips from './Drips';
import { useResusContext } from './ResusContext';

const Meds: React.FC = () => {
  const { weight } = useResusContext();
  if (!weight) return null;
  return (
    <div>
      <Drugs />
      <Drips />
    </div>
  );
};

export default Meds;