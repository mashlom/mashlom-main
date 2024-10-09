import React, { useState, useEffect } from 'react';
import protocolsData from './data/emergency-protocols.json';
import drugsDefinitions from './data/resus-drugs-definitions.json';
import { Accordion } from 'react-bootstrap';
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

  // Create an array of keys based on the number of sections in the JSON data
  const allKeys = protocolsData.emergencyProtocols.map((_, index) => index.toString());

  return (
    <div>
      <Accordion defaultActiveKey={allKeys} alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header>קבצים מצורפים</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>תרופות</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Defibirilator</Accordion.Header>
            <Accordion.Body>
              <AirwaysAndDefibrillator />
            </Accordion.Body>
          </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EmergencyProtocols;