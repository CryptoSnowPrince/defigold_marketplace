import { useEffect, useRef } from 'react';

const Banner = () => {
  const message = 'New Home for Bitcoin NFTs - ';
  const marqueeRef = useRef(null);

  // Use useEffect to start the animation when the component mounts
  useEffect(() => {
    const marqueeWidth = marqueeRef.current.offsetWidth;
    const animationDuration = (marqueeWidth / 50) * 1000; // Adjust the speed as needed
    marqueeRef.current.style.animationDuration = `${animationDuration}ms`;
  }, []);

  return (
    <div className='marquee-wrapper'>
      <div ref={marqueeRef} className='marquee'>
        {[...Array(10)].map((_, index) => (
          <span key={index} className='marquee-text'>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
