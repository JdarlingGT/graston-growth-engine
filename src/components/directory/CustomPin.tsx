"use client";

import React from 'react';
import { Pin } from '@vis.gl/react-google-maps';

interface CustomPinProps {
  background?: string;
  borderColor?: string;
  glyphColor?: string;
  scale?: number;
  // Add any other props that Pin component explicitly accepts if needed
  // All other unknown props will be filtered out
}

const CustomPin: React.FC<CustomPinProps> = ({ background, borderColor, glyphColor, scale }) => {
  return (
    <Pin
      background={background}
      borderColor={borderColor}
      glyphColor={glyphColor}
      scale={scale}
      // Do NOT spread '...rest' here, as it might contain unknown props like 'data-dyad-id'
    />
  );
};

export default CustomPin;