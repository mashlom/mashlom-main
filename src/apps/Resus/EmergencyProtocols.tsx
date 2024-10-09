import React, { useState, useEffect } from 'react';
import protocolsData from './data/emergency-protocols.json';
import { Accordion } from 'react-bootstrap';
import './EmergencyProtocols.css';

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
  const [emergencyProtocols, setEmergencyProtocols] = useState<ProtocolSection[]>([]);

  useEffect(() => {
    setEmergencyProtocols(protocolsData.emergencyProtocols);
  }, []);

  // Create an array of keys based on the number of sections in the JSON data
  const allKeys = protocolsData.emergencyProtocols.map((_, index) => index.toString());

  const openProtocol = (protocol: Protocol) => {
    // Implement the logic to open the protocol here
    console.log('Opening protocol:', protocol.name);
  };

  return (
    <div>
      <Accordion defaultActiveKey={allKeys} alwaysOpen>
        {emergencyProtocols.map((protocolSection, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{protocolSection.section}</Accordion.Header>
            <Accordion.Body>
              <ul className="list-group">
                {protocolSection.protocols.map((protocol, protocolIndex) => (
                  <li 
                    key={protocolIndex} 
                    className="list-group-item"
                    onClick={() => openProtocol(protocol)}
                  >
                    <a 
                      className="dropdown-item" 
                      style={{ textAlign: 'start' }} 
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      {protocol.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default EmergencyProtocols;