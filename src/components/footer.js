import XIcon from '../assets/img/X.png';
import TelegramIcon from '../assets/img/telegram.png';
import DiscordIcon from '../assets/img/discord.png';
import MediumIcon from '../assets/img/medium.png';
import GithubIcon from '../assets/img/github.png';
import ZealyIcon from '../assets/img/zealy.png';
import LinkIcon from '../assets/img/link.svg';
import Logo from '../assets/img/Logo.svg';
import GoldArrow from '../assets/img/gold-arrow.svg';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ALERT_ERROR_CONFIG } from '../utils/constants';
import { toast } from 'react-toastify';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Footer = () => {
  const emailRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log(email);

    if (!isValidEmail(email)) {
      toast('Invalid Email format', ALERT_ERROR_CONFIG);
      return;
    }
    axios
      .post('https://defigold-email-be.vercel.app/form/subscribe', {
        email: email,
      })
      .then((res) => {
        Swal.fire({
          showClass: {
            popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
          },
          hideClass: {
            popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
          },
          customClass: {
            popup:
              'font-sfui md:text-[0.8vw] xl:text-[1vw] bg-black-500 text-dark-text',
            confirmButton: 'px-4 py-2 bg-gold rounded-md font-bold',
          },
          confirmButtonColor: '#EFB325',
          title: 'Thank you for subscribing to Defi.Gold updates.',
          text: '🚀 Get ready to stay ahead of the curve in the Bitcoin blockchain revolution. Your subscription means a lot to us as we redefine the future of trading and smart contracts.',
          footer: 'Stay tuned for exciting news and updates!',
          icon: 'success',
          iconColor: '#EFB325',
        });
      })
      .catch((err) => {
        Swal.fire({
          showClass: {
            popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
          },
          hideClass: {
            popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
          },
          customClass: {
            popup:
              'font-sfui md:text-[0.8vw] xl:text-[1vw] bg-black-500 text-dark-text',
            confirmButton: 'px-4 py-2 bg-gold rounded-md font-bold',
          },
          confirmButtonColor: '#EFB325',
          text: 'Your request has been already submitted!',
          title: 'Request already submitted!',
          icon: 'success',
          iconColor: '#EFB325',
        });
      })
      .finally(() => {
        emailRef.current.value = '';
      });
  };

  return (
    <div className='flex flex-col lg:w-full bg-dark-text/95'>
      <div className='flex flex-col px-5 py-9 lg:hidden'>
        <span className='text-gold font-sfui font-semibold text-lg leading-[22px] text-center py-5 px-14 mb-5'>
          Subscribe for News, Updates and Articles
        </span>
        <input
          type='email'
          placeholder='E-mail'
          ref={emailRef}
          className='py-4 px-[18px] border-solid border-[1px] border-white rounded-md bg-transparent mx-[1px] font-sfui text-base leading-5 placeholder:text-hint-text mb-3'
        />
        <button
          className='bg-base-text rounded-md text-dark-text px-6 py-4 text-base leading-4 font-bold font-sfui'
          onClick={onSubmit}
        >
          SUBSCRIBE NOW
        </button>
      </div>
      <div className='flex flex-col gap-6 lg:hidden py-9 text-center font-teko'>
        <span className='pb-4 text-gold text-[40px] leading-9'>Join Us</span>
        <Link
          target='_blank'
          to='https://twitter.com/TeamDefiGold'
          className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
        >
          <img src={XIcon} alt='twitter' className='mr-7' />
          <span className='mr-4'>X</span>
          {/* <a target='_blank' href='https://twitter.com/TeamDefiGold'> */}
          <img src={LinkIcon} alt='link' className='w-8 h-8' />
          {/* </a> */}
        </Link>
        <Link
          target='_blank'
          to='https://t.me/+lCxBNCrBuNRiNmZh'
          className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
        >
          <img src={TelegramIcon} alt='telegram' className='mr-6' />
          <span className='mr-4'>Telegram</span>
          {/* <a target='_blank' href='https://t.me/+lCxBNCrBuNRiNmZh'> */}
          <img src={LinkIcon} alt='link' className='w-8 h-8' />
          {/* </a> */}
        </Link>
        {/* <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
          <img src={DiscordIcon} alt='twitter' className='mr-5' />
          <span className='mr-4'>Discord</span>
          <a target='_blank' href='#'>
            <img src={LinkIcon} alt='link' className='w-8 h-8' />
          </a>
        </div> */}
        <Link
          target='_blank'
          to='https://medium.com/@teamdefi.gold'
          className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
        >
          <img src={MediumIcon} alt='medium' className='mr-4' />
          <span className='mr-4'>Medium</span>
          {/* <a target='_blank' href='https://medium.com/@teamdefi.gold'> */}
          <img src={LinkIcon} alt='link' className='w-8 h-8' />
          {/* </a> */}
        </Link>
        <Link
          target='_blank'
          to='https://zealy.io/cw/defigoldtoken/questboard'
          className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
        >
          <img src={ZealyIcon} alt='medium' className='mr-4 w-8 h-8' />
          <span className='mr-4'>Zealy</span>
          {/* <a target='_blank' href='https://medium.com/@teamdefi.gold'> */}
          <img src={LinkIcon} alt='link' className='w-8 h-8' />
          {/* </a> */}
        </Link>
        {/* <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
          <img src={GithubIcon} alt='twitter' className='mr-6' />
          <span className='mr-4'>Github</span>
          <a target='_blank' href='#'>
            <img src={LinkIcon} alt='link' className='w-8 h-8' />
          </a>
        </div> */}
      </div>
      <div className='flex flex-col gap-6 md:hidden py-9 text-center font-sfui'>
        <Link to='https://defi.gold'>
          <img src={Logo} alt='logo' className='w-3/5 m-auto' />
        </Link>
        <span className='px-10 text-base-text text-base leading-5'>
          The most secure, transparent and decentralized NFT marketplace.
          Discover and collect digital artifacts!
        </span>
      </div>
      <div className='grid grid-cols-2 md:hidden py-9 font-sfui'>
        <div className='flex flex-col justify-start mx-auto gap-2.5 text-base-text text-lg leading-6'>
          <span className='text-gold font-teko text-[30px] leading-7 pb-1'>
            Marketplace
          </span>
          <Link to='/explorer'>All NFTs</Link>
          <Link to='/collections'>Collections</Link>
          {/* <Link>Launchpad</Link> */}
          <Link to='/mint'>Mint</Link>
        </div>
        <div className='flex flex-col justify-start px-12 gap-2.5 text-base-text text-lg leading-6'>
          <span className='text-gold font-teko text-[30px] leading-7 pb-1'>
            Resources
          </span>
          {/* <span>Help Center</span> */}
          <Link to='https://defi.gold'>About Us</Link>
          <Link to='/terms'>Terms & Conditions</Link>
          <Link to='/policy'>Privacy Policy</Link>
        </div>
      </div>
      <div className='hidden md:flex flex-col pt-16'>
        <div className='flex flex-row px-[250px] py-5 justify-between items-center'>
          <span className='text-gold font-sfui font-semibold text-2xl leading-7'>
            Subscribe for News, Updates and Articles
          </span>
          <div className='footer-image-container'>
            <img src={GoldArrow} alt='arrow' className='footer-image' />
            <div className='footer-shine'></div>
          </div>
          <div className='flex flex-row p-[2px] border-solid border-2 border-light-text rounded-md w-1/2 items-center'>
            <input
              type='email'
              placeholder='E-mail'
              ref={emailRef}
              className='px-5 py-[14px] border-0 bg-transparent font-sfui text-xl leading-6 placeholder:text-hint-text flex-1 outline-none'
            />
            <button
              className='bg-base-text rounded-md text-dark-text px-6 py-[18px] text-base leading-4 font-bold font-sfui'
              onClick={onSubmit}
            >
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </div>
      <div className='hidden md:flex flex-row pt-20 px-12 gap-12 pb-9'>
        <div className='flex flex-col px-3 gap-8 w-[390px]'>
          <Link to='https://defi.gold'>
            <img src={Logo} alt='logo' className='h-[120px]' />
          </Link>
          <p className='font-sfui text-2xl text-base-text'>
            The most secure, transparent and decentralized Bitcoin NFT
            marketplace. Discover and collect digital artifacts!
          </p>
        </div>
        <div className='flex flex-row flex-1'>
          <div className='flex flex-col flex-1 mx-auto gap-7 text-2xl text-center'>
            <span className='text-gold font-teko text-[40px] leading-9 pb-3'>
              Marketplace
            </span>
            <Link to='/explorer'>All NFTs</Link>
            <Link to='/collections'>Collections</Link>
            {/* <Link>Launchpad</Link> */}
            <Link to='/mint'>Mint</Link>
          </div>
          <div className='flex flex-col flex-1 mx-auto gap-7 text-2xl text-center'>
            <span className='text-gold font-teko text-[40px] leading-9 pb-3'>
              Resources
            </span>
            {/* <span>Help Center</span> */}
            <Link to='https://defi.gold'>About Us</Link>
            <Link to='/terms'>Terms & Conditions</Link>
            <Link to='/policy'>Privacy Policy</Link>
          </div>
          <div className='flex flex-col flex-1 gap-8 mx-auto text-center'>
            <span className='pb-2 text-gold text-[40px] leading-9'>
              Join Us
            </span>
            <Link
              target='_blank'
              to='https://twitter.com/TeamDefiGold'
              className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
            >
              <img src={XIcon} alt='twitter' className='mr-7' />
              <span className='mr-4'>X</span>
              {/* <a target='_blank' href='https://twitter.com/TeamDefiGold'> */}
              <img src={LinkIcon} alt='link' className='w-8 h-8' />
              {/* </a> */}
            </Link>
            <Link
              target='_blank'
              to='https://t.me/+lCxBNCrBuNRiNmZh'
              className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
            >
              <img src={TelegramIcon} alt='telegram' className='mr-6' />
              <span className='mr-4'>Telegram</span>
              {/* <a target='_blank' href='https://t.me/+lCxBNCrBuNRiNmZh'> */}
              <img src={LinkIcon} alt='link' className='w-8 h-8' />
              {/* </a> */}
            </Link>
            {/* <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
              <img src={DiscordIcon} alt='twitter' className='mr-5' />
              <span className='mr-4'>Discord</span>
              <a target='_blank' href='#'>
                <img src={LinkIcon} alt='link' className='w-8 h-8' />
              </a>
            </div> */}
            <Link
              target='_blank'
              to='https://medium.com/@teamdefi.gold'
              className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
            >
              <img src={MediumIcon} alt='medium' className='mr-4' />
              <span className='mr-4'>Medium</span>
              {/* <a target='_blank' href='https://medium.com/@teamdefi.gold'> */}
              <img src={LinkIcon} alt='link' className='w-8 h-8' />
              {/* </a> */}
            </Link>
            <Link
              target='_blank'
              to='https://zealy.io/cw/defigoldtoken/questboard'
              className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'
            >
              <img src={ZealyIcon} alt='zealy' className='mr-4 w-8 h-8' />
              <span className='mr-4'>Zealy</span>
              {/* <a target='_blank' href='https://zealy.io/cw/defigoldtoken'> */}
              <img src={LinkIcon} alt='link' className='w-8 h-8' />
              {/* </a> */}
            </Link>
            {/* <div className='flex flex-row justify-center items-center text-base-text text-4xl leading-8'>
              <img src={GithubIcon} alt='twitter' className='mr-6' />
              <span className='mr-4'>Github</span>
              <a target='_blank' href='#'>
                <img src={LinkIcon} alt='link' className='w-8 h-8' />
              </a>
            </div> */}
          </div>
        </div>
      </div>
      <div
        className='border-t-[1px] mx-8 lg:mx-[360px]'
        style={{ borderColor: 'rgb(248, 248, 248, 0.1)' }}
      ></div>
      <span className='text-center text-hint-text text-base leading-5 font-sfui py-5'>
        © 2024 DG Labs Ltd. All rights reserved
      </span>
    </div>
  );
};

export default Footer;
