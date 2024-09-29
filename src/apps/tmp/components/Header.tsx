import React from 'react';

interface HeaderProps {
  credit: string;
}

export const Header: React.FC<HeaderProps> = ({ credit }) => {
  return (
    <header>
      <div className="header-content">
        <h1>אלח דם - חטיבת ילדים</h1>
        <p>קרדיט: {credit}</p>
      </div>
    </header>
  );
};