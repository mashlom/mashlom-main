import React, { useState, useEffect } from 'react';

interface ImageProps {
  src: string; // Could be a local file name or an external URL
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  marginBottom?: string;
}

const getImageURL = (name: String) => {
  return new URL(`../assets/${name}`, import.meta.url).href
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  marginBottom,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  useEffect(() => {
    const loadImage = async () => {
      const isExternal =
        src.startsWith('http://') || src.startsWith('https://');

      if (isExternal) {
        setImgSrc(src);
      } else {
        try {
          setImgSrc(getImageURL(src));
        } catch (err) {
          console.error('Error loading image:', err);
        }
      }
    };

    loadImage();
  }, [src]);

  return (
    <img
      className={className}
      src={imgSrc}
      alt={alt}
      style={{ width, height, marginBottom }}
    />
  );
};

export default Image;
