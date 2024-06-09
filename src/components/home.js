import banner from '../assets/img/home-banner.png';
import firstTap from '../assets/img/tap1.png';
import secondTap from '../assets/img/tap2.png';
import thirdTap from '../assets/img/tap3.png';
import fourthTap from '../assets/img/tap4.png';

const Home = () => {
  return (
    <div id='home' className='flex flex-col justify-center items-center m-auto lg:pt-24 pt-11'>
      <span className='text-gold font-sfui text-center mb-5 lg:text-[32px] lg:leading-10 w-52 lg:w-full text-lg leading-5'>
        One Stop Shop for Lightening Taproot assets
      </span>
      <span className='font-teko font-light text-center mb-5 w-full lg:w-[1000px] text-7xl leading-[60px] lg:text-[168px] lg:leading-[152px]'>
        Secure Digital Artifacts Marketplace
      </span>
      <div className='flex flex-row gap-6 mb-5 text-sm leading-[14px] lg:text-lg lg:leading-[18px]'>
        <button className='flex-1 font-sfui w-32 lg:w-44 py-2 font-medium bg-gold rounded text-dark-text'>Start Collecting</button>
        <button className='flex-1 font-sfui w-32 lg:w-44 py-2 text-base-text font-medium bg-transparent border-2 border-gold rounded'>Mint BTC NFT</button>
      </div>
      <img src={banner} alt='banner' className='scale-[1.03] lg:scale-100 ml-[-20px]' />
      <div className='flex flex-col py-28'>
        <span className='section-title px-5 pb-5 lg:pb-16'>Sponsored Taproot Asset</span>
        <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-16 gap-4 m-auto'>
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
      <div className='bg-gold py-2 w-screen overflow-hidden whitespace-nowrap box-border items-center m-auto'>
        <div className='inline-block pl-[100%] text-anim'>
          {/* <span className='inline-block lg:hidden pr-[100%] text-3xl leading-7 text-dark-text'>New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs</span>
          <span className='inline-block lg:hidden pr-[100%] text-3xl leading-7 text-dark-text'>New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs</span> */}
          <span className='inline-block pr-[100%] text-5xl leading-[45px] text-dark-text'>New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs</span>
          <span className='inline-block pr-[100%] text-5xl leading-[45px] text-dark-text'>New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
