import React from 'react';

interface FooterProps {
  openPanel: (panel: 'INSTRUCTIONS' | 'ANTIBIOTIC_TREATMENT') => void;
}

export const Footer: React.FC<FooterProps> = ({ openPanel }) => {
  return (
    <footer className="text-center text-white footer">
      <div className="footer-container">
        <a className="footer-button" onClick={() => openPanel('INSTRUCTIONS')}>
          <div className="bottom-menu-color"><i className="fa-solid fa-chalkboard-user"></i></div>
          <div className="text">הוראות שימוש</div>
        </a>
        <a className="footer-button" onClick={() => openPanel('ANTIBIOTIC_TREATMENT')}>
          <div className="bottom-menu-color"><i className="fa-solid fa-thermometer"></i></div>
          <div className="text">טיפול אנטיביוטי</div>
        </a>
      </div>
    </footer>
  );
};