import React, { useState, useEffect } from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 rounded-full bg-transparent text-white transition-opacity outline-none z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ArrowUpCircleIcon className='h-8 w-8 text-gray-500' />
    </button>
  );
};

export default ScrollToTopButton;
