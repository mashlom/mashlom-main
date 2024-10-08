import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

interface FooterNavProps {
  hospital: string;
}

const FooterNav: React.FC<FooterNavProps> = ({ hospital }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const openPanel = (panel: 'meds' | 'protocols') => {
    navigate(`/${hospital}/resus/${panel}`);
  };

  const isActive = (panel: string) => {
    return location.pathname.includes(panel) ? 'active' : '';
  };

  return (
    <footer className="text-center text-white footer">
      <div className="footer-container">
        <button 
          className={`footer-button ${isActive('meds')}`} 
          onClick={() => openPanel('meds')}
        >
          <div className="bottom-menu-color">
            <FontAwesomeIcon icon={faDatabase} />
          </div>
          <div className="text">תרופות</div>
        </button>
        <button 
          className={`footer-button ${isActive('protocols')}`} 
          onClick={() => openPanel('protocols')}
        >
          <div className="bottom-menu-color">
            <FontAwesomeIcon icon={faFileInvoice} />
          </div>
          <div className="text">פרוטוקולי חירום</div>
        </button>
      </div>
    </footer>
  );
};

export default FooterNav;