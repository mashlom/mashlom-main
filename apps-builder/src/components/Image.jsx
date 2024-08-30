import React from 'react';

const Image = ({ src, alt, className, width, height}) => {
  const imgSrc = require(`@images/${src}`);
  return <img className={className} src={imgSrc.default} alt={alt} style={{ width, height }} />;
};

export default Image;