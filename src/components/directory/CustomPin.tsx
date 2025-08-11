"use client";

import React from 'react';
import { Pin } from '@vis.gl/react-google-maps';

interface CustomPinProps {
  background?: string;
  borderColor?: string;
  glyphColor?: string;
  scale?: number;
}

const CustomPin: React.FC<CustomPinProps> = ({ background, borderColor, glyphColor, scale }) => {
  return (
    <Pin
      background={background}
      borderColor={borderColor}
      glyphColor={glyphColor}
      scale={scale}
    />
  );
};

export default CustomPin;