import NFTs from '../assets/img/image-nfts.png';

const Mint = () => {
  return (
    <div id='mint' className='flex flex-col pt-4 px-5 pb-[72px]'>
      <span className='pb-2.5 lg:pb-[87px] section-title'>
        Mint AI-Artifacts to Bitcoin
      </span>
      <div className='flex flex-col gap-5 lg:hidden'>
        <span className='text-gold text-[32px] leading-7'>"AI Minter" is coming soon!</span>
        <img src={NFTs} alt='nfts' className='rounded-md w-full' />
        <p className='text-lg font-sfui leading-6'>
          If you're struggling to find a skilled artist to bring your Bitcoin NFT vision to lief? Would you like to craft the sophisticated Digital Artifacts you envision?
        </p>
        <p className='text-lg font-sfui leading-6'>
          Now you don't need to worry about it.
          Create impressive AI-generated Taproot Assets wthMilo's "AI-MINTER".
        </p>
        <p className='text-lg font-sfui leading-6'>
          By entering text prompts or uploading photos, Milo holders can create stunning AI-generated Taproot Assets for their own Bitcoin NFTs.
        </p>
        <p className='text-lg font-sfui leading-6'>
        Awaken your inner artist and see what amazing Digital Artifacts you can create with artificial intelligence
        </p>
        <span className='rounded bg-dark-box py-[12px] px-[50px] text-gold font-sfui font-bold text-sm leading-[14px] w-fit'>COMING SOON</span>
      </div>
    </div>
  );
};

export default Mint;
