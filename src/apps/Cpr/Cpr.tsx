import React, { useState, useEffect, useCallback } from 'react';
import { NotificationProvider } from './Notifications';
import { CPRLogProvider, useCPRLog } from './CPRLog';
import CprManager from './CprManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faHeartPulse, faSection, faListCheck } from '@fortawesome/free-solid-svg-icons';
import CPRLogComponent from './CPRLog';
import VitalSigns from './VitalSigns';
import MedicalProcedures from './MedicalProcedures';
import ABCDEFProcedures from './ABCDEFProcedures';
import ReminderBox from './ReminderBox';
import ResusInputs from '../Resus/ResusInputs';
import emergencyProtocols from '../Resus/data/emergency-protocols.json';
import './Cpr.css';

const CprContent: React.FC = () => {
  const [logExpanded, setLogExpanded] = useState(false);
  const [vitalSignsExpanded, setVitalSignsExpanded] = useState(false);
  const [proceduresExpanded, setProceduresExpanded] = useState(false);
  const [abcdefExpanded, setABCDEFExpanded] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderShown, setReminderShown] = useState(false);

  const toggleLog = () => setLogExpanded(!logExpanded);
  const toggleVitalSigns = () => setVitalSignsExpanded(!vitalSignsExpanded);
  const toggleProcedures = () => setProceduresExpanded(!proceduresExpanded);
  const toggleABCDEF = () => {
    setABCDEFExpanded(!abcdefExpanded);
    if (!abcdefExpanded) {
      setReminderShown(false);
    }
  };

  const handleCloseReminder = useCallback(() => {
    setShowReminder(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (abcdefExpanded && !reminderShown) {
      timer = setTimeout(() => {
        setShowReminder(true);
        setReminderShown(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [abcdefExpanded, reminderShown]);

  const { addEntry } = useCPRLog();

  const handleResusInputsSubmit = (age: string, weight: number | null, protocol: string) => {
    // Add the age and weight entry
    if (age && weight !== null) {
      addEntry({
        timestamp: new Date().toISOString(),
        text: `מטופל בגיל ${getFormattedAge(age)}, במשקל ${weight} ק"ג`,
        type: 'patientDetails',
        isImportant: true
      });
    }

    // If protocol is provided, add a separate entry for it
    if (protocol) {
      const protocolName = getProtocolName(protocol);
      addEntry({
        timestamp: new Date().toISOString(),
        text: `הגיע בעקבות ${protocolName}`,
        type: 'patientDetails',
        isImportant: false
      });
    }
  };

  // Utility function to get the formatted age
  const getFormattedAge = (age: string): string => {
    if (age === "0 month") return "בן יומו";
    if (age === "1 month") return "חודש";
    if (age === "2 month") return "חודשיים";
    if (age === "1 year") return "שנה";
    if (age === "2 year") return "שנתיים";
    return age.replace("month", "חודשים").replace("year", "שנים");
  };

  // Utility function to get the protocol name
  const getProtocolName = (protocolId: string): string => {
    // Find the protocol name from the emergencyProtocols data
    const protocol = emergencyProtocols.emergencyProtocols
      .flatMap(section => section.protocols)
      .find(p => p.id === protocolId);
    return protocol ? protocol.name : protocolId;
  };

  return (
    <>
      <CprManager />
      <ResusInputs onSubmit={handleResusInputsSubmit} />
      <div style={{ direction: 'rtl'}}>
        <h4 className="section-header" onClick={toggleVitalSigns}>
          <span className="toggle-icon">{vitalSignsExpanded ? '-' : '+'}</span>
          <span className="section-name"><FontAwesomeIcon icon={faHeartPulse} /> מדדים</span>
        </h4>
        {vitalSignsExpanded && (
          <div id="collapseable-area-vital-signs" className={`collapseable ${vitalSignsExpanded ? 'expanded' : ''}`}>
            <VitalSigns />
          </div>
        )}
        
        <h4 className="section-header" onClick={toggleProcedures}>
          <span className="toggle-icon">{proceduresExpanded ? '-' : '+'}</span>
          <span className="section-name"><FontAwesomeIcon icon={faSection} /> LINE / זונדה / קטטר</span>
        </h4>
        {proceduresExpanded && (
          <div id="collapseable-area-procedures" className={`collapseable ${proceduresExpanded ? 'expanded' : ''}`}>
            <MedicalProcedures />
          </div>
        )}

        <h4 className="section-header" onClick={toggleABCDEF}>
          <span className="toggle-icon">{abcdefExpanded ? '-' : '+'}</span>
          <span className="section-name"><FontAwesomeIcon icon={faListCheck} /> ABCDEF </span>
        </h4>
        {abcdefExpanded && (
          <div id="collapseable-area-abcdef" className={`collapseable ${abcdefExpanded ? 'expanded' : ''}`}>
            <ABCDEFProcedures />
          </div>
        )}

        <h4 className="section-header" onClick={toggleLog}>
          <span className="toggle-icon">{logExpanded ? '-' : '+'}</span>
          <span className="section-name"><FontAwesomeIcon icon={faFileLines} /> יומן</span>
        </h4>      
        {logExpanded && (
          <div id="collapseable-area-log" className={`collapseable ${logExpanded ? 'expanded' : ''}`}>
            <CPRLogComponent />
          </div>
        )}
      </div>
      {showReminder && <ReminderBox onClose={handleCloseReminder} />}
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