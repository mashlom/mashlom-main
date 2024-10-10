import React, { useState, useEffect } from 'react';
import drugsDefinitions from './data/resus-drugs-definitions.json';
import './EmergencyProtocols.css';
import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';
import { useResusContext } from './ResusContext';
import Drug from './Drug';
import Drip from './Drip';

const EmergencyProtocols: React.FC = () => {  
  const [protocolDrugs, setProtocolDrugs] = useState<string[]>([]);
  const [protocolDrips, setProtocolDrips] = useState<string[]>([]);
  const { protocol } = useResusContext();

  useEffect(() => {
    if (!protocol) {
      setProtocolDrugs([]);
      setProtocolDrips([]);
      return;
    }
    const selectedProtocol = drugsDefinitions.protocols.find(p => p.protocolId === protocol);
    if (selectedProtocol) {
      setProtocolDrugs(selectedProtocol.drugs || []);
      setProtocolDrips(selectedProtocol.drips || []);
    } else {
      setProtocolDrugs([]);
      setProtocolDrips([]);
    }    
  }, [protocol]);

  const hasDrugsOrDrips = protocolDrugs.length > 0 || protocolDrips.length > 0;

  return (
    <div>
      <div className="protocol-section">
        <h2 className="protocol-header">קבצים מצורפים</h2>
        <div className="protocol-body">
          <ul className="list-group">
            <li>
              <a 
                className="dropdown-item" 
                style={{ textAlign: 'start' }} 
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                תרופה ראשונה
              </a>
            </li>
            <li>
              <a 
                className="dropdown-item" 
                style={{ textAlign: 'start' }} 
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                תרופה שניה
              </a>
            </li>
          </ul>
        </div>
      </div>

      {hasDrugsOrDrips && (
        <div className="protocol-section">
          <h2 className="protocol-header">תרופות</h2>
          <div className="protocol-body">
            <ul className="list-group" style={{direction:"ltr"}}>
              {protocolDrugs.map((drugId) => {
                const drug = drugsDefinitions.drugs.find(d => d.id === drugId);
                return drug ? <Drug key={drug.id} drug={drug} /> : null;
              })}
              {protocolDrips.map((dripId) => {
                const drip = drugsDefinitions.drips.find(d => d.id === dripId);
                return drip ? <Drip key={drip.id} drip={drip} /> : null;
              })}
            </ul>
          </div>
        </div>
      )}

      <div className="protocol-section">
        <h2 className="protocol-header">Defibrillator</h2>
        <div className="protocol-body">
          <AirwaysAndDefibrillator />
        </div>
      </div>
    </div>
  );
};

export default EmergencyProtocols;