import React, { useState } from 'react';
import { NotificationProvider } from './Notifications';
import { CPRLogProvider } from './CPRLog';
import CprManager from './CprManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import CPRLogComponent from './CPRLog';
import './Cpr.css';

const CprContent: React.FC = () => {
  const [logExpanded, setLogExpanded] = useState(false);

  const toggleLog = () => {
    setLogExpanded(!logExpanded);
  };

  return (
    <>
      <CprManager />
      <div style={{ direction: 'rtl', marginTop: '20px' }}>
        <h4 className="log-header" onClick={toggleLog}>
          <span className="toggle-icon">
            {logExpanded ? '-' : '+'}
          </span>
          <span className="section-name"><FontAwesomeIcon icon={faFileLines} /> יומן</span>
        </h4>      
        {logExpanded && (
          <div id="collapseable-area-log" className={`collapseable ${logExpanded ? 'expanded' : ''}`}>
            <CPRLogComponent />
          </div>
        )}
      </div>
    </>
  );
};

const Cpr: React.FC = () => {
  return (
    <NotificationProvider>
      <CPRLogProvider>
        <div>
          <div className="container main-content">
            <div className="group-container">
              <h1>החייאה</h1>
              <CprContent />
            </div>
          </div>
        </div>
      </CPRLogProvider>
    </NotificationProvider>
  );
};

export default Cpr;