import React from 'react';
import { useEffect, useState } from 'react';

const Header = ({ credit, hospitalLogo }) => {
  const [leftLogoUrl, setLeftLogoUrl] = useState('');
  const [creditStr, setCreditStr] = useState('');

  useEffect(() => {
    // Assuming window.hospitalConfig.logo is available
    setLeftLogoUrl(hospitalLogo);

    if (credit) {
      setCreditStr(`הוכן בסיוע בי"ח ${credit}`);
    }
  }, [credit]);

  return (
    <header className="d-flex justify-content-between align-items-center header">
      <div className="d-flex justify-content-start align-items-center" style={{ width: '15%' }}>
        <img src="/apps/assets/logo/IconOnly_Transparent_NoBuffer.png" alt="Mashlom Logo" className="header-mashlom-logo" />
      </div>

      <div className="header-text mx-auto">
        <span className="d-block" style={{ fontSize: '15px' }}>
          mashlom.me - כלי עזר לצוותי רפואה
        </span>
        <span style={{ fontSize: '10px' }}>{creditStr}</span>
      </div>

      <div className="d-flex justify-content-end align-items-center" style={{ width: '15%' }}>
        {leftLogoUrl && <img src={leftLogoUrl} alt="Hospital Logo" className="header-assuta-logo" />}
      </div>
    </header>
  );
};

export default Header;