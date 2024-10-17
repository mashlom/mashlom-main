import React from 'react';
import CorrectedAgeCalculator from './CorrectedAgeCalculator';

interface CorrectedAgeProps {
  hospital: string;
}

const CorrectedAge: React.FC<CorrectedAgeProps> = ({ hospital }) => {
  console.log('hospital:', hospital);
  return (
    <div>
      <CorrectedAgeCalculator />
    </div>
  );
};

export default CorrectedAge;
