import firstTap from '../assets/img/tap5.png';
import secondTap from '../assets/img/tap6.png';
import thirdTap from '../assets/img/tap7.png';
import fourthTap from '../assets/img/tap8.png';

const Explore = () => {
  return (
    <div id='explore' className='flex flex-col w-screen px-5 pt-20 lg:pt-48 overscroll-x-hidden'>
      <span className='pb-5 lg:pb-12 lg:text-center section-title'>Explore NFTs</span>
      <div className='flex flex-row w-full gap-2.5 pb-[30px] lg:gap-8 lg:pb-[60px] justify-center'>
        <button className='explore-tag-item'>Art</button>
        <button className='explore-tag-item'>Collections</button>
        <button className='explore-tag-item'>Domain Names</button>
        <button className='explore-tag-item'>Music</button>
        <button className='explore-tag-item'>Photography</button>
        <button className='explore-tag-item'>Others</button>
      </div>
      <div className='grid lg:grid-cols-4 grid-cols-2 pb-[55px] lg:gap-16 lg:pb-32 gap-4 m-auto'>
        <div className='rounded-md bg-dark-box flex flex-col lg:p-6 p-3'>
          <img src={firstTap} className='w-[140px] h-[140px] lg:w-[280px] lg:h-[280px] pb-[14px] lg:pb-7 rounded-md' alt='tap_asset' />
          <span className='pl-1 text-lg leading-4 lg:text-4xl lg:leading-8 text-white pb-2 lg:pb-4'>
            Taproot Asset #34118
          </span>
          <div className='flex flex-row p-2.5 lg:p-5 justify-between items-center bg-primary rounded-md'>
            <span className='text-light-text font-sfui text-xs leading-[10px] lg:text-xl lg:leading-5'>Price</span>
            <span className='text-gold font-bold text-sm leading-3 lg:text-xl lg:leading-[18px]'>0.0001 BTC</span>
          </div>
        </div>
        <div className='rounded-md bg-dark-box flex flex-col lg:p-6 p-3'>
          <img src={secondTap} className='w-[140px] h-[140px] lg:w-[280px] lg:h-[280px] pb-[14px] lg:pb-7 rounded-md' alt='tap_asset' />
          <span className='pl-1 text-lg leading-4 lg:text-4xl lg:leading-8 text-white pb-2 lg:pb-4'>
            Taproot Asset #34118
          </span>
          <div className='flex flex-row p-2.5 lg:p-5 justify-between items-center bg-primary rounded-md'>
            <span className='text-light-text font-sfui text-xs leading-[10px] lg:text-xl lg:leading-5'>Price</span>
            <span className='text-gold font-bold text-sm leading-3 lg:text-xl lg:leading-[18px]'>0.0001 BTC</span>
          </div>
        </div>
        <div className='rounded-md bg-dark-box flex flex-col lg:p-6 p-3'>
          <img src={thirdTap} className='w-[140px] h-[140px] lg:w-[280px] lg:h-[280px] pb-[14px] lg:pb-7 rounded-md' alt='tap_asset' />
          <span className='pl-1 text-lg leading-4 lg:text-4xl lg:leading-8 text-white pb-2 lg:pb-4'>
            Taproot Asset #34118
          </span>
          <div className='flex flex-row p-2.5 lg:p-5 justify-between items-center bg-primary rounded-md'>
            <span className='text-light-text font-sfui text-xs leading-[10px] lg:text-xl lg:leading-5'>Price</span>
            <span className='text-gold font-bold text-sm leading-3 lg:text-xl lg:leading-[18px]'>0.0001 BTC</span>
          </div>
        </div>
        <div className='rounded-md bg-dark-box flex flex-col lg:p-6 p-3'>
          <img src={fourthTap} className='w-[140px] h-[140px] lg:w-[280px] lg:h-[280px] pb-[14px] lg:pb-7 rounded-md' alt='tap_asset' />
          <span className='pl-1 text-lg leading-4 lg:text-4xl lg:leading-8 text-white pb-2 lg:pb-4'>
            Taproot Asset #34118
          </span>
          <div className='flex flex-row p-2.5 lg:p-5 justify-between items-center bg-primary rounded-md'>
            <span className='text-light-text font-sfui text-xs leading-[10px] lg:text-xl lg:leading-5'>Price</span>
            <span className='text-gold font-bold text-sm leading-3 lg:text-xl lg:leading-[18px]'>0.0001 BTC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
