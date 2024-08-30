import React from 'react';

const Cover = ({ src = 'cover1.png', title, className }) => {
  const imgSrc = require(`@images/${src}`);
  return (
    <div style={{ maxWidth: '64rem', margin: 'auto' }}>
      <img
        className={className}
        src={imgSrc.default}
        alt={`cover-${src}`}
        style={{ maxWidth: '100%' }}
      />
      {title && <div className="main-title">{title}</div>}
    </div>
  );
};

export default Cover;
