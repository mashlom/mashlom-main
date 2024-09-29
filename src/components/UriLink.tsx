import React from 'react';

// Define the UriTypes as an enum to provide type safety
export enum UriTypes {
  TEL = 'tel:',
  MAILTO = 'mailto:',
  SMS = 'sms:',
  WHATSAPP = 'https://wa.me/',
  TELEGRAM = 'https://t.me/',
}

// Define the types for the component props
interface UriLinkProps {
  uriType: UriTypes; // Use the enum for type safety
  link: string;
  text?: string;
  className?: string;
}

const UriLink: React.FC<UriLinkProps> = ({
  uriType,
  link,
  text,
  className,
}) => {
  const uriLink = `${uriType}${link}`;

  return (
    <a className={className} href={uriLink} target="_self">
      {text || link}
    </a>
  );
};

export default UriLink;
