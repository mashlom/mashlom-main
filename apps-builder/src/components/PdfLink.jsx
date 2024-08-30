import React from 'react';

const PdfLink = ({ fileName, text, isDownload }) => {
  const pdfSrc = require(`../pdfs/${fileName}.pdf`);
  const href = pdfSrc.default;
  const linkProps = isDownload ? { download: true } : { target: "_blank", rel: "noopener noreferrer" };
  const defaultStyles = { textDecoration: 'underline' };
  return (
    <a href={href} {...linkProps} style={defaultStyles}>
      {text}
    </a>
  );
};

export default PdfLink;