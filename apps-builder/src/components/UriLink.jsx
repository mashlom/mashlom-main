import React from 'react';

export const UriTypes = {
  TEL: 'tel:',
  MAILTO: 'mailto:',
  SMS: 'sms:',
  WHATSAPP: 'https://wa.me/',
  TELEGRAM: 'https://t.me/',
};

const UriLink = ({ uriType, link, text, className }) => {
  const uriLink = `${uriType}${link}`;

  return (
    <a className={className} href={uriLink} target="_self">
      {text || link}
    </a>
  );
};

export default UriLink;
