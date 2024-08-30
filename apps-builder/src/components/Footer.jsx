import React from 'react';
import Image from './Image';
import './Footer.scss';

const Footer = () => (
  <footer className="page-footer">
    <div className="footer-top">
      <nav style={{ marginRight: '20px' }}>
        <ul className="footer-ul">
          <li className="footer-copy-write">
            <a
              className="fmenu-big-link"
              aria-label="Assuta Ashdod"
              href="https://www.assutaashdod.co.il/"
              target="_self"
            >
             © {new Date().getFullYear()} Assuta Ashdod
            </a>
          </li>
          <li className="hide-on-mobile">
            <a
              className="fmenu-big-link"
              aria-label="about"
              href="https://www.assutaashdod.co.il/en/?catid=%7BEE360582-387D-4CE7-9105-BDEF14D4A4DA%7D"
              target="_self"
            >
              footer
            </a>
          </li>
          <li className="hide-on-mobile">
            <a
              className="fmenu-big-link"
              aria-label="public inquiries"
              href="https://www.assutaashdod.co.il/en/public_inquiries/"
              target="_self"
            >
              footer 2
            </a>
          </li>
          <li className="hide-on-mobile">
            <a
              className="fmenu-big-link"
              aria-label="accessibility"
              href="https://www.assutaashdod.co.il/?catid=%7B0CFCB0BD-DF84-412A-AEA5-ED6C957733F4%7D"              
              target="_self"
            >
              footer 3
            </a>
          </li>
        </ul>
      </nav>
      <nav
        style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '20px' }}
      >
        <ul className="footer-ul">
          <li>
            <Image
              src="human-exp-logo-gray.png"
              alt="human experience logo"
              className="footer-image-size"
              style={{ marginLeft: '20px' }}
            />
          </li>
          <li>
            <a href="https://www.mashlom.me">
              <Image
                src="FullLogo_Transparent_NoBuffer.png"
                alt="mashlom.me"
                className="footer-image-size"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
