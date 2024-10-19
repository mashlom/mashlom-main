import React, { useState } from 'react';
import { NotificationProvider } from './Notifications';
import { CPRLogProvider } from './CPRLog';
import CprManager from './CprManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import CPRLogComponent from './CPRLog';
import VitalSigns from './VitalSigns';
import './Cpr.css';

const CprContent: React.FC = () => {
  const [logExpanded, setLogExpanded] = useState(false);
  const [vitalSignsExpanded, setVitalSignsExpanded] = useState(false);

  const toggleLog = () => {
    setLogExpanded(!logExpanded);
  };

  const toggleVitalSigns = () => {
    setVitalSignsExpanded(!vitalSignsExpanded);
  };

  return (
    <>
      <CprManager />
      <div style={{ direction: 'rtl', marginTop: '20px' }}>
        <h4 className="section-header" onClick={toggleVitalSigns}>
          <span className="toggle-icon">
            {vitalSignsExpanded ? '-' : '+'}
          </span>
          <span className="section-name"><FontAwesomeIcon icon={faHeartPulse} /> מדדים</span>
        </h4>
        {vitalSignsExpanded && (
          <div id="collapseable-area-vital-signs" className={`collapseable ${vitalSignsExpanded ? 'expanded' : ''}`}>
            <VitalSigns />
          </div>
        )}
        
        <h4 className="section-header" onClick={toggleLog}>
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