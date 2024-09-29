import React from 'react';

interface DemoAppProps {
  hospital: string;
}

const DemoApp: React.FC<DemoAppProps> = ({ hospital }) => {
  return (
    <div>
      <h2>Demo App</h2>
      <p>This is a placeholder for the Demo app in {hospital}</p>
    </div>
  );
};

export default DemoApp;