import React from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import './Resus.css';
import '../AppStyle.css';
import Meds from './Meds';
import Cpr from './Cpr';
import EmergencyProtocols from './EmergencyProtocols';
import FooterNav from './ResusFooterNav';
import ResusInputs from './ResusInputs';
import { ResusProvider } from './ResusContext';

const Resus: React.FC = () => {    
  const { hospital } = useParams<{ hospital: string }>();

  return (
    <ResusProvider>
      <div>
        <div className="container main-content">
          <div className="group-container">
            <h1>מינוני תרופות בעת החייאה</h1>
            <ResusInputs />
            <Routes>
              <Route index element={<Navigate to="protocols" replace />} />
              <Route path="meds" element={<Meds />} />
              <Route path="protocols" element={<EmergencyProtocols />} />
              <Route path="cpr" element={<Cpr />} />
            </Routes>          
          </div>
        </div>
        <FooterNav hospital={hospital || ''} />
      </div>
    </ResusProvider>
  );
};

export default Resus;