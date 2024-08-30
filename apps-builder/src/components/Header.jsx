import React from 'react';
import { Link } from 'gatsby';
import Image from './Image';
import UriLink, { UriTypes } from './UriLink';
import './Header.scss';

const Header = () => {
  return (
    <header className="page-header">
      <div className="header-main-section">
        <Link className="logo" to="/" title="Assuta Ashdod">
          <Image
            src={'assuta_logo.svg'}
            alt="Assuta Ashdod"
            width="300px"
          />
        </Link>
        <div className='header-contact'>
          <span className="assuta-call-text">
            <UriLink
              uriType={UriTypes.TEL}
              link="*8480"
              text="8480*"
              className="assuta-call-phone"
            />
          </span>
          <span className="assuta-call-text">
            <UriLink
              uriType={UriTypes.TEL}
              link="08-3004100"
              className="assuta-call-phone"
            />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
