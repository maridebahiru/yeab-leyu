import React from 'react';

interface HeritageDividerProps {
  className?: string;
  color?: string;
}

export const HeritageDivider: React.FC<HeritageDividerProps> = ({
  className = 'my-8',
  color = '#C5A059'
}) => {
  return (
    <div className={`flex items-center justify-center space-x-3 opacity-80 ${className}`}>
      <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A059]" />
      
      {/* Delicate Botanical Floral Ornament SVG */}
      <svg
        width="28"
        height="18"
        viewBox="0 0 28 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M14 2C14 2 12 6 8 8C4 10 1 9 1 9C1 9 4 12 8 12C12 12 14 16 14 16C14 16 16 12 20 12C24 12 27 9 27 9C27 9 24 10 20 8C16 6 14 2 14 2Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={`${color}15`}
        />
        <circle cx="14" cy="9" r="1.8" fill={color} />
      </svg>

      <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A059]" />
    </div>
  );
};
