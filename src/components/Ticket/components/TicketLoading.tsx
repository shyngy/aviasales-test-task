import React from 'react';

const TicketLoading = () => (
  <svg
    role="img"
    width="500"
    height="175"
    aria-labelledby="loading-aria"
    viewBox="0 0 500 175"
    preserveAspectRatio="none"
    className="shadow"
    style={{ marginTop: 15, borderRadius: 10 }}
  >
    <title id="loading-aria">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clipPath="url(#clip-path)"
      fill="url(#fill)"
    />
    <defs>
      <clipPath id="clip-path">
        <rect x="300" y="191" rx="0" ry="0" width="5" height="12" />
        <rect x="346" y="88" rx="0" ry="0" width="1" height="0" />
        <rect x="82" y="63" rx="0" ry="0" width="0" height="1" />
        <rect x="0" y="0" rx="12" ry="12" width="499" height="175" />
      </clipPath>
      <linearGradient id="fill">
        <stop
          offset="0.599964"
          stopColor="#FDFDFD"
          stopOpacity="1"
        >
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          />
        </stop>
        <stop
          offset="1.59996"
          stopColor="#ffffff"
          stopOpacity="1"
        >
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          />
        </stop>
        <stop
          offset="2.59996"
          stopColor="#FDFDFD"
          stopOpacity="1"
        >
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    </defs>
  </svg>
);

export default TicketLoading;
