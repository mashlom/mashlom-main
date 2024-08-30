import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Cover from './Cover';

import './Layout.scss';


const Layout = ({
  children,
  includeCover = true,
  coverTitle,
}) => {

  return (
    <div>
      <Header />
      <main>
        {includeCover && <Cover title={coverTitle} />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
