import { Zoom } from 'react-awesome-reveal';
import firstTap from '../assets/img/tap5.png';
import secondTap from '../assets/img/tap6.png';
import thirdTap from '../assets/img/tap7.png';
import fourthTap from '../assets/img/tap8.png';
import sunLight from '../assets/img/sun.png';
import Card from './card';

const Explore = () => {
  return (
    <Zoom duration={2000} triggerOnce={false}>
      <div id='explore' className='flex flex-col w-screen px-5 pt-20 lg:pt-48 overscroll-x-hidden'>
        {/* <img src={sunLight} className='sun-light-bg' alt='sun' /> */}
        <span className='pb-5 lg:pb-12 lg:text-center section-title'>Explore NFTs</span>
        <div className='flex flex-row w-full gap-2.5 pb-[30px] lg:gap-8 lg:pb-[60px] justify-center'>
          <button className='explore-tag-item'>Art</button>
          <button className='explore-tag-item'>Collections</button>
          <button className='explore-tag-item'>Domain Names</button>
          <button className='explore-tag-item'>Music</button>
          <button className='explore-tag-item'>Photography</button>
          <button className='explore-tag-item'>Others</button>
        </div>
        <div className='grid lg:grid-cols-4 grid-cols-2 pb-[55px] lg:gap-16 lg:pb-[405px] gap-4 m-auto'>
          <Card imgSrc={firstTap} title='Taproot Asset #34118' price={0.0001} />
          <Card imgSrc={secondTap} title='Taproot Asset #34118' price={0.0001} />
          <Card imgSrc={thirdTap} title='Taproot Asset #34118' price={0.0001} />
          <Card imgSrc={fourthTap} title='Taproot Asset #34118' price={0.0001} />
        </div>
      </div>
    </Zoom>
  );
};

export default Explore;
