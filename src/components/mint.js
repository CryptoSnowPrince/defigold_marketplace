import NFTs from '../assets/img/image-nfts.png';
import whiteArrow from '../assets/img/white-arrow.svg';

const Mint = () => {
  return (
    <div
      id='mint'
      className='w-screen flex flex-col pt-4 px-5 pb-[72px] xl:mt-[-184px] xl:pb-40 xl:mx-auto'
    >
      <span className='pb-2.5 lg:pb-[87px] section-title'>
        Mint AI-Artifacts to Bitcoin
      </span>
      <div className='flex flex-col gap-5 lg:hidden'>
        <span className='text-gold text-[32px] leading-7'>
          "AI Minter" is coming soon!
        </span>
        <img src={NFTs} alt='nfts' className='rounded-md w-full' />
        <p className='text-lg font-sfui leading-6'>
          Are you struggling to find a skilled artist to bring your Bitcoin NFT
          vision to life?
        </p>
        <p className='text-lg font-sfui leading-6'>
          We Got You. Create impressive AI-generated Taproot Assets with DeFi
          Gold's "AI Minter."
        </p>
        <p className='text-lg font-sfui leading-6'>
          By entering text prompts or uploading photos, DGOLD holders can
          generate stunning Bitcoin NFTs.
        </p>
        <p className='text-lg font-sfui leading-6'>
          Awaken your inner artist and discover the amazing Digital Artifacts
          you can create with the power of artificial intelligence.
        </p>
        <span className='rounded bg-dark-box py-[12px] px-[50px] text-gold font-sfui font-bold text-sm leading-[14px] w-fit'>
          COMING SOON
        </span>
      </div>
      <div className='hidden lg:grid grid-cols-2 gap-16 lg:px-24 xl:px-56'>
        <div>
          <img src={NFTs} className='rounded-md' alt='nfts' />
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row gap-2 pb-3'>
            <span className='text-gold text-[50px] leading-[45px]'>
              "AI Minter" is coming soon!&nbsp;
            </span>
            <div className='image-container'>
              <img src={whiteArrow} alt='arrow' className='image' />
              <div className='shine'></div>
            </div>
          </div>
          <p className='text-2xl font-sfui'>
            Are you struggling to find a skilled artist to bring your Bitcoin
            NFT vision to life?
          </p>
          <br />
          <p className='text-2xl font-sfui'>
            We Got You. Create impressive AI-generated Taproot Assets with
            Milo's "AI Minter."
          </p>
          <br />
          <p className='text-2xl font-sfui'>
            By entering text prompts or uploading photos, Milo holders can
            generate stunning Taproot Assets for their Bitcoin NFTs.
          </p>
          <br />
          <p className='text-2xl font-sfui'>
            Awaken your inner artist and discover the amazing Digital Artifacts
            you can create with the power of artificial intelligence.
          </p>
          <br />
          <span className='rounded bg-dark-box py-[18px] px-[74px] text-gold font-sfui font-bold text-lg leading-[18px] w-fit'>
            COMING SOON
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mint;
