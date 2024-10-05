import React from 'react';
import { Helmet } from 'react-helmet';

export interface SEOProps {
  tabTitle: string
  title: string;
  description: string;
  keywords: string;
  url: string;
}

const SEO: React.FC<SEOProps> = ({ tabTitle, title, description, keywords, url }) => {
  return (
    <Helmet>
      <meta property='og:title' content={title} />
      <meta property='og:type' content='Article' />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property='og:site_name' content='mashlom.me' />
      <meta property='og:image' content="https://mashlom.me/apps/assets/logo/FullLogo1200x630.jpg" />
      <meta property="og:image:secure_url" content="https://mashlom.me/apps/assets/logo/FullLogo1200x630.jpg" />
      <meta property='og:url' content={url} />
      <meta property='og:description' content={description} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, NOODP" />
      <title>{tabTitle}</title>
    </Helmet>
  );
};

export default SEO;
