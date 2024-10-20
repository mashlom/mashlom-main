import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faFileInvoice, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import './ResusFooterNav.css'

interface FooterNavProps {
  hospital: string;
}

const FooterNav: React.FC<FooterNavProps> = ({ hospital }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePanel, setActivePanel] = useState<string | null>(null);

  useEffect(() => {
    const panel = location.pathname.split('/').pop();
    setActivePanel(panel || null);
  }, [location]);

  const openPanel = (panel: 'meds' | 'protocols') => {
    const currentSearchParams = new URLSearchParams(location.search);
    navigate(`/${hospital}/resus/${panel}?${currentSearchParams.toString()}`);
  };

  const openCpr = () => {
    const currentSearchParams = new URLSearchParams(location.search);
    navigate(`/${hospital}/cpr?${currentSearchParams.toString()}`);
  };

  const isActive = (panel: string) => {
    return activePanel === panel ? 'active' : '';
  };

  return (
    <footer className="text-center text-white footer">
      <div className="footer-container">
        {['meds', 'protocols'].map((panel) => (
          <button 
            key={panel}
            className={`footer-button ${isActive(panel)}`} 
            onClick={() => openPanel(panel as 'meds' | 'protocols')}
          >
            <div className="bottom-menu-color">
              <FontAwesomeIcon 
                icon={
                  panel === 'meds' ? faDatabase :
                  panel === 'protocols' ? faFileInvoice :
                  faHeartPulse
                } 
              />
            </div>
            <div className="text">
              {panel === 'meds' ? 'תרופות' :'פרוטוקולי חירום'}
            </div>
          </button>
        ))}
        <button 
            key="cpr"
            className="footer-button"
            onClick={() => openCpr()}            
          >
            <div className="bottom-menu-color">
              <FontAwesomeIcon 
                icon={
                  faHeartPulse
                } 
              />
            </div>
            <div className="text">'החייאה'
            </div>
          </button>
      </div>
    </footer>
  );
};

export default FooterNav;