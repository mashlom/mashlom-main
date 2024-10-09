import React, { useState, useEffect } from 'react';
import protocolsData from './data/emergency-protocols.json';
// import drugDefintions from './data/resus-drugs-definitions.json';
import { Accordion } from 'react-bootstrap';
import './EmergencyProtocols.css';
import AirwaysAndDefibrillator from './AirwaysAndDefibrillator';
// import { useResusContext } from './ResusContext';

interface Protocol {
  name: string;
  algorithmFile: string;
  protocolFile: string;
}

interface ProtocolSection {
  section: string;
  protocols: Protocol[];
}

const EmergencyProtocols: React.FC = () => {  
  const [_emergencyProtocols, setEmergencyProtocols] = useState<ProtocolSection[]>([]);
  const [_airwaysData, _setAirwaysData] = useState<any>({});
  useEffect(() => {
    setEmergencyProtocols(protocolsData.emergencyProtocols);
  }, []);

  // Create an array of keys based on the number of sections in the JSON data
  const allKeys = protocolsData.emergencyProtocols.map((_, index) => index.toString());

  // const openProtocol = (protocol: Protocol) => {
  //   // Implement the logic to open the protocol here
  //   console.log('Opening protocol:', protocol.name);
  // };

  return (
    <div>
      <Accordion defaultActiveKey={allKeys} alwaysOpen>
          <Accordion.Item eventKey="1" >
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
          <Accordion.Item eventKey="1" >
            <Accordion.Header>תרופות</Accordion.Header>
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
          <Accordion.Item eventKey="1" >
            <Accordion.Header>Defibirilator</Accordion.Header>
            <Accordion.Body>
              <AirwaysAndDefibrillator></AirwaysAndDefibrillator>
            </Accordion.Body>
          </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default EmergencyProtocols;