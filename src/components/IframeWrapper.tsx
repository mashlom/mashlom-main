import React from 'react';

interface IframeWrapperProps {
  url: string;
  title?: string;
}

const IframeWrapper: React.FC<IframeWrapperProps> = ({
  url,
  title = 'Iframe content',
}) => {

  return (
    <div 
      className="iframe-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        zIndex: 999999,
      }}
    >
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