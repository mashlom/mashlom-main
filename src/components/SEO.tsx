import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

const Seo: React.FC<SEOProps> = ({ title, description, keywords }) => (
  <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="Article" />
      <meta
        property="og:image"
        content="https://mashlom.me/apps/assets/logo/FullLogo1200x630.jpg"
      />
      <meta property="og:url" content="https://mashlom.me" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  </HelmetProvider>
);

export default Seo;
