import React from 'react';

interface HeaderProps {
  credit: string;
}

const Header: React.FC<HeaderProps> = ({ credit }) => {
  return (
    <header>
      <h1>{credit}</h1>
    </header>
  );
};

export default Header;
