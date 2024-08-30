/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { useEffect, useState } from 'react';
import favIcon from '@images/favicon-32x32.png';
import appleTouchIcon from '@images/apple-touch-icon.png';

export default function Seo({ title, author, description, children, location, pageKeywords }) {
  const siteUrl = 'https://assuta-ashdod.mashlom.me';
  const [pageUrl, setPageUrl] = useState(location ? `${siteUrl}${location?.pathname}` : '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(location ? `${siteUrl}${location?.pathname}` : window.location.href.split('?')[0]);
    }
  }, [location, siteUrl]);

  const metaDescription = description || '';
  const defaultKeywords = "assuta ashdod, רפואת ילדים, אסותא אשדוד"
  const keywords = pageKeywords || defaultKeywords;

  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, initial-scale=1.0"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={appleTouchIcon}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={favIcon}
      />
      <meta
        property="og:image"
        content="https://assuta-ashdod.mashlom.me/assets/images/assuta/sharing-image.png"
      />
      <meta property="og:type" content="Article" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="mashlom.me" />
      <meta
        property="og:image:secure_url"
        content="https://assuta-ashdod.mashlom.me/assets/images/assuta/sharing-image.png"
      />
      <meta
        property="og:url"
        content={pageUrl}
      />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, NOODP" />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
}