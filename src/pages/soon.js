import { useEffect } from 'react';
import banner from '../assets/img/home-banner.png';

const Soon = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className='w-screen h-[80vh] lg:h-[90vh] flex flex-col justify-center items-center relative'>
      <h1 className='text-4xl lg:text-9xl'>Coming Soon</h1>
      <h2 className='lg:text-3xl font-sfui'>This page is under maintainance</h2>
      <img
        src={banner}
        alt='banner'
        className='z-[-1] scale-[1.03] opacity-30 lg:scale-100 ml-[-20px] absolute bottom-0'
      />
    </div>
  );
};

export default Soon;
