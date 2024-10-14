import React from 'react';
import { useResusContext } from './ResusContext';

interface DefiConfig {
  name: string;
  joulePerKg: number;
}

interface DefibrillatorProps {
  configs: DefiConfig[];
}

const Defibrillator: React.FC<DefibrillatorProps> = ({ configs }) => {
  const { weight } = useResusContext();
  
  const getDefi = (multiplier: number): number => {
    return weight ? Math.min(multiplier * weight, 200) : 0;
  };

  return (
    <div className="cards-container row row-cols-1 row-cols-md-1 g-4">
      <ul className="list-group" style={{ backgroundColor: '#B9EDE7', borderRadius: '10px', padding: '15px', marginRight: "15px", lineHeight: '1rem' }}>
        {configs.map((config, index) => (
          <div key={index} style={{marginBottom: "15px"}}>
            <span>{config.name}: </span>
            <span style={{fontWeight: "bold"}}>{getDefi(config.joulePerKg)} ({config.joulePerKg}J/Kg)</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Defibrillator;