import React from 'react';
//import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';
import { NotificationProvider } from './Notifications';
import CprManager from './CprManager';

// This is a new inner component that uses the notification
const CprContent: React.FC = () => {
  return (
    <>
      <CprManager />
    </>
  );
};

const Cpr: React.FC = () => {
  return (
    <NotificationProvider>
      <div>
      <div className="container main-content">
        <div className="group-container">
          <h1>החייאה</h1>
          <CprContent />
        </div>
      </div>
    </div>
    </NotificationProvider>
  );
};

export default Cpr;