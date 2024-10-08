import React from 'react';

interface ProtocolsProps {
  weight: number;
  age: string;
}

const Protocols: React.FC<ProtocolsProps> = ({ weight, age }) => {
    console.log(weight, age);
  return (
    <div>
      <h2>Protocols</h2>
      {/* Add protocol content here */}
    </div>
  );
};

export default Protocols;