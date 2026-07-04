'use client';

import React, { useMemo } from 'react';

type DrivingVideoProps = {
  condition: 'highway' | 'city' | 'off-road';
};

const videoSources = {
  city: 'https://storage.googleapis.com/studio-a-prod-assets/autowise-assets/city-driving.mp4',
  highway: 'https://storage.googleapis.com/studio-a-prod-assets/autowise-assets/highway-driving.mp4',
  'off-road': 'https://storage.googleapis.com/studio-a-prod-assets/autowise-assets/off-road-driving.mp4'
};

export function DrivingVideo({ condition }: DrivingVideoProps) {
  const videoSrc = useMemo(() => videoSources[condition], [condition]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        key={videoSrc}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
}
