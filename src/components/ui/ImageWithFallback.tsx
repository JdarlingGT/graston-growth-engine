import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    const placeholder = fallbackSrc || `https://placehold.co/600x400/E1E1E1/333333?text=Image+Not+Available`;
    setImgSrc(placeholder);
  };

  return <img src={imgSrc} onError={handleError} {...props} />;
};

export default ImageWithFallback;