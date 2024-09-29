import React from 'react';
import Image from './Image';

interface LogoProps {
  alt?: string;
  marginBottom?: string;
}

const Logo: React.FC<LogoProps> = ({ alt, marginBottom }: LogoProps) => (
  <Image
    src="logo/FullLogo_Transparent_NoBuffer.png"
    alt={alt || 'Logo'}
    className="logo"
    marginBottom={marginBottom}
  />
);

export default Logo;
