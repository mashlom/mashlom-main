import React from 'react';
//import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';
import { useResusContext } from './ResusContext';
import { NotificationProvider } from './cpr/Notifications';
import CprManager from './cpr/CprManager';

// This is a new inner component that uses the notification
const CprContent: React.FC = () => {
  const { age, weight } = useResusContext();
  console.log(age, weight)
  return (
    <>
      <CprManager />
      {/* <button onClick={handleSomeAction}>Start CPR</button>
      <div>              
        {weight !== null && weight > 0 && age && (
          <AirwaysAndDefibrillator/>
        )}        
      </div> */}
    </>
  );
};

// This is the main Cpr component that provides the NotificationProvider
const Cpr: React.FC = () => {
  return (
    <NotificationProvider>
      <CprContent />
    </NotificationProvider>
  );
};

export default Cpr;