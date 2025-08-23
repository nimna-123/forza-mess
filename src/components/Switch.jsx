import React from 'react';

const Switch = ({ checked, onChange, disabled = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-12 h-6',
    lg: 'w-16 h-8'
  };

  const toggleClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  const translateClasses = {
    sm: checked ? 'translate-x-4' : 'translate-x-0.5',
    md: checked ? 'translate-x-6' : 'translate-x-0.5',
    lg: checked ? 'translate-x-8' : 'translate-x-0.5'
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${sizeClasses[size]}
        ${disabled 
          ? 'cursor-not-allowed opacity-50' 
          : 'cursor-pointer'
        }
        ${checked 
          ? 'bg-indigo-600 hover:bg-indigo-700' 
          : 'bg-gray-200 hover:bg-gray-300'
        }
      `}
    >
      <span
        className={`
          inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out
          ${toggleClasses[size]}
          ${translateClasses[size]}
        `}
      />
    </button>
  );
};

export default Switch;
