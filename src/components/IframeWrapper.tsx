import React from 'react';
import SEO, { SEOProps } from './SEO';

interface IframeWrapperProps {
  url: string;
  title?: string;
  seo: SEOProps;
}

const IframeWrapper: React.FC<IframeWrapperProps> = ({
  url,
  title = 'Iframe content',
  seo
}) => {

  return (
    <div 
      className="iframe-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 999999,
      }}
    >
      <SEO
        tabTitle={seo.tabTitle}
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />
      <iframe
        src={url}
        title={title}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allowFullScreen
      />
    </div>
  );
};

export default IframeWrapper;