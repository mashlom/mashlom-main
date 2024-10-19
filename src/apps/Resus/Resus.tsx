import React, { useMemo } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import './Resus.css';
import '../AppStyle.css';
import Meds from './Meds';
import EmergencyProtocols from './EmergencyProtocols';
import FooterNav from './ResusFooterNav';
import ResusInputs from './ResusInputs';
import { ResusProvider, useResusContext } from './ResusContext';
import emergencyProtocols from './data/emergency-protocols.json';

interface ProtocolData {
  id: string;
  name: string;
  algorithmFile?: string;
  protocolFile?: string;
}

const ResusContent: React.FC = () => {
  const { protocol } = useResusContext();
  
  const headerText = useMemo(() => {
    const currentPath = location.pathname;
    if (currentPath.includes('/resus/meds')) {
      return "מינוני תרופות";
    }
    if (!protocol) {
      return "מערכת חדר הלם";
    }
    
    const allProtocols = (emergencyProtocols.emergencyProtocols as { protocols: ProtocolData[] }[])
      .flatMap(section => section.protocols);
    const selectedProtocol = allProtocols.find(p => p.id === protocol);
    
    return selectedProtocol ? `טיפול ב${selectedProtocol.name}` : "מערכת חדר הלם";
  }, [protocol]);

  return (
    <div>
      <div className="container main-content">
        <div className="group-container">
          <h1>{headerText}</h1>
          <ResusInputs />
          <Routes>
            <Route index element={<Navigate to="protocols" replace />} />
            <Route path="meds" element={<Meds />} />
            <Route path="protocols" element={<EmergencyProtocols />} />
          </Routes>          
        </div>
      </div>
    </div>
  );
};

const Resus: React.FC = () => {    
  const { hospital } = useParams<{ hospital: string }>();

  return (
    <ResusProvider>
      <ResusContent />
      <FooterNav hospital={hospital || ''} />
    </ResusProvider>
  );
};

export default Resus;