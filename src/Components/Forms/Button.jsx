import React from 'react';

const Button = ({ children, isDisabled, ...props }) => {
  return (
    <div>
      <button
        disabled={isDisabled}
        className="
    spectral-bold 
    cursor-pointer 
    rounded-lg 
    bg-blue-500 
    text-blue-950 
    py-3 
    px-8 
    box-border 
    border-2 
    border-transparent 
    shadow-md                 
    hover:border-blue-300 
    hover:shadow-lg            
    hover:shadow-blue-300/50 
    transition-all            
    duration-200
    disabled:opacity-50      
    disabled:hover:shadow-none  
    disabled:hover:border-transparent
    disabled:cursor-wait
  "
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
