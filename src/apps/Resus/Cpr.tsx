import React from 'react';

interface CprProps {
    weight: number;
    age: string;
  }
  

const Cpr: React.FC<CprProps> = ({ weight, age }) => {
  console.log(weight, age);
  return (
    <div>
      CPR
    </div>
  );
};

export default Cpr;