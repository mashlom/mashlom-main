import React from 'react';
import SEO from './SEO';

interface LayoutProps {
  children?: React.ReactNode;
  seo: {
    title: string;
    description: string;
    keywords?: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, seo }) => {
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description ? seo.description : ''}
        keywords={seo.keywords ? seo.keywords : ''}
      />

      <div className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;
