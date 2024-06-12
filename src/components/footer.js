import XIcon from '../assets/img/X.png';
import TelegramIcon from '../assets/img/telegram.png';
import DiscordIcon from '../assets/img/discord.png';
import MediumIcon from '../assets/img/medium.png';
import GithubIcon from '../assets/img/github.png';
import LinkIcon from '../assets/img/link.svg';
import Logo from '../assets/img/Logo.svg';
import GoldArrow from '../assets/img/gold-arrow.svg';

const Footer = () => {
  return (
    <div className='flex flex-col lg:w-full bg-dark-text/95'>
      <div className='flex flex-col px-5 py-9 lg:hidden'>
        <span className='text-gold font-sfui font-semibold text-lg leading-[22px] text-center py-5 px-14 mb-5'>
          Subscribe for News, Updates and Articles
        </span>
        <input type='email' placeholder='E-mail' className='py-4 px-[18px] border-solid border-[1px] border-white rounded-md bg-transparent mx-[1px] font-sfui text-base leading-5 placeholder:text-hint-text mb-3' />
        <button className='bg-base-text rounded-md text-dark-text px-6 py-4 text-base leading-4 font-bold font-sfui'>SUBSCRIBE NOW</button>
      </div>
      <div className='flex flex-col gap-6 lg:hidden py-9 text-center font-teko'>
        <span className='pb-4 text-gold text-[40px] leading-9'>Join Us</span>
        <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
          <img src={XIcon} alt='twitter' className='mr-7' />
          <span className='mr-4'>X</span>
          <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
        </div>
        <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
          <img src={TelegramIcon} alt='twitter' className='mr-6' />
          <span className='mr-4'>Telegram</span>
          <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
        </div>
        <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
          <img src={DiscordIcon} alt='twitter' className='mr-5' />
          <span className='mr-4'>Discord</span>
          <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
        </div>
        <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
          <img src={MediumIcon} alt='twitter' className='mr-4' />
          <span className='mr-4'>Medium</span>
          <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
        </div>
        <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
          <img src={GithubIcon} alt='twitter' className='mr-6' />
          <span className='mr-4'>Github</span>
          <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
        </div>
      </div>
      <div className='flex flex-col gap-6 lg:hidden py-9 text-center font-sfui'>
        <img src={Logo} alt='logo' className='w-3/5 m-auto' />
        <span className='px-10 text-base-text text-base leading-5'>
          The most secure, transparent and decentralized Taproot asset marketplace. Discover and collect digital artifacts!
        </span>
      </div>
      <div className='grid grid-cols-2 lg:hidden py-9 font-sfui'>
        <div className='flex flex-col justify-start mx-auto gap-2.5 text-base-text text-lg leading-6'>
          <span className='text-gold font-teko text-[30px] leading-7 pb-1'>Marketplace</span>
          <span>All NFTs</span>
          <span>Collections</span>
          <span>Launchpad</span>
          <span>Mint</span>
        </div>
        <div className='flex flex-col justify-start px-12 gap-2.5 text-base-text text-lg leading-6'>
          <span className='text-gold font-teko text-[30px] leading-7 pb-1'>Resources</span>
          <span>Help Center</span>
          <span>About Us</span>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
      <div className='hidden lg:flex flex-col pt-16'>
        <div className='flex flex-row px-[250px] py-5 justify-between items-center'>
          <span className='text-gold font-sfui font-semibold text-2xl leading-7'>
            Subscribe for News, Updates and Articles
          </span>
          <div className='footer-image-container'>
            <img src={GoldArrow} alt='arrow' className='footer-image' />
            <div className='footer-shine'></div>
          </div>
          <div className='flex flex-row p-[2px] border-solid border-2 border-light-text rounded-md w-1/2 items-center'>
            <input type='email' placeholder='E-mail' className='px-5 py-[14px] border-0 bg-transparent font-sfui text-xl leading-6 placeholder:text-hint-text flex-1' />
            <button className='bg-base-text rounded-md text-dark-text px-6 py-[18px] text-base leading-4 font-bold font-sfui'>SUBSCRIBE NOW</button>
          </div>
        </div>
      </div>
      <div className='hidden lg:flex flex-row pt-20 px-48 gap-44 pb-9'>
        <div className='flex flex-col px-3 gap-8 w-[390px]'>
          <img src={Logo} alt='logo' className='h-[120px]' />
          <p className='font-sfui text-2xl text-base-text'>
            The most secure, transparent and decentralized Taproot asset marketplace. Discover and collect digital artifacts!
          </p>
        </div>
        <div className='flex flex-row flex-1'>
          <div className='flex flex-col flex-1 mx-auto gap-7 text-2xl'>
            <span className='text-gold font-teko text-[40px] leading-9 pb-3'>Marketplace</span>
            <span>All NFTs</span>
            <span>Collections</span>
            <span>Launchpad</span>
            <span>Mint</span>
          </div>
          <div className='flex flex-col flex-1 mx-auto gap-7 text-2xl'>
            <span className='text-gold font-teko text-[40px] leading-9 pb-3'>Resources</span>
            <span>Help Center</span>
            <span>About Us</span>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
          <div className='flex flex-col flex-1 gap-8 mx-auto'>
            <span className='pb-2 text-gold text-[40px] leading-9'>Join Us</span>
            <div className='flex flex-row items-center text-base-text text-4xl leading-8'>
              <img src={XIcon} alt='twitter' className='mr-7' />
              <span className='mr-4'>X</span>
              <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
            </div>
            <div className='flex flex-row items-center text-base-text text-4xl leading-8'>
              <img src={TelegramIcon} alt='twitter' className='mr-6' />
              <span className='mr-4'>Telegram</span>
              <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
            </div>
            <div className='flex flex-row items-center text-base-text text-4xl leading-8'>
              <img src={DiscordIcon} alt='twitter' className='mr-5' />
              <span className='mr-4'>Discord</span>
              <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
            </div>
            <div className='flex flex-row items-center text-base-text text-4xl leading-8'>
              <img src={MediumIcon} alt='twitter' className='mr-4' />
              <span className='mr-4'>Medium</span>
              <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
            </div>
            <div className='flex flex-row items-center text-base-text text-4xl leading-8'>
              <img src={GithubIcon} alt='twitter' className='mr-6' />
              <span className='mr-4'>Github</span>
              <a target='_blank' href='#'><img src={LinkIcon} alt='link' className='w-8 h-8'/></a>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t-[1px] mx-8 lg:mx-[360px]' style={{borderColor: 'rgb(248, 248, 248, 0.1)'}}></div>
      <span className='text-center text-hint-text text-base leading-5 font-sfui py-5'>
        Copyright © 2024 DeFi.Gold. All rights reserved
      </span>
    </div>
  );
};

export default Footer;
