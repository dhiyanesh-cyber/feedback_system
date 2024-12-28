import React, { useState, useEffect } from 'react';

const ToastAlert = ({ message, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 ${typeStyles[type]} text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-slide-in-right z-50`}
    >
      {message}
    </div>
  );
};

export default ToastAlert;