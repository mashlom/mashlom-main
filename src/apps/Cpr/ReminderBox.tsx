import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPhone, faLungsVirus, faXRay, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ReminderBox.css';

const ReminderBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isVibrating, setIsVibrating] = useState(false);

  useEffect(() => {
    const vibrateTimer = setTimeout(() => {
      setIsVibrating(true);
      setTimeout(() => setIsVibrating(false), 1500);
    }, 2000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => {
      clearTimeout(vibrateTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div className={`reminder-box ${isVibrating ? 'vibrate' : ''}`}>
      <div className="reminder-header">
        <h3><FontAwesomeIcon icon={faBell} /> תזכורת</h3>
        <button onClick={onClose}><FontAwesomeIcon icon={faTimes} /></button>
      </div>
      <ul className="reminder-content">
        <li><span className="icon"><FontAwesomeIcon icon={faPhone} /></span><span className="text">להתקשר לכונן</span></li>
        <li><span className="icon"><FontAwesomeIcon icon={faLungsVirus} /></span><span className="text">POCUS</span></li>
        <li><span className="icon"><FontAwesomeIcon icon={faXRay} /></span><span className="text">צילום חזה</span></li>
      </ul>
    </div>
  );
};

export default ReminderBox;