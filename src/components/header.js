import { useContext, useEffect, useState } from 'react';
import Logo from '../assets/img/Logo.svg';
import sLogo from '../assets/img/sm_Logo.svg';
import { GlobalContext } from './../context/globalContext';
import { getAddressInfoByUnisat } from '../utils/utils';

const Header = ({ visibility, setNavbar, setWalletPanel }) => {
  const { connected, paymentAddress } = useContext(GlobalContext);
  const [balance, setBalance] = useState(null);
  const [payAddrInfo, setPayAddrInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayAddrInfo = async () => {
      try {
        const payAddrInfoByUnisat = await getAddressInfoByUnisat(
          paymentAddress.address
        );
        setBalance(payAddrInfoByUnisat.btcSatoshi);
      } catch (err) {
        setError(err);
      }
    };

    fetchPayAddrInfo();
  }, [connected]);

  return (
    <>
      <div className='w-screen fixed bg-dark-text z-[40] hidden lg:flex flex-row items-center justify-between h-36 pt-[72px] pb-8 xl:px-8 px-[69px]'>
        <div className='flex flex-row pl-6 xl:pl-10 items-center'>
          <img src={Logo} className='w-48' alt='logo' />
        </div>
        <div className='flex flex-row flex-1 items-center justify-around xl:justify-center xl:gap-16'>
          <span>
            <a href='/' className='text-4xl font-medium'>
              Home
            </a>
          </span>
          <span>
            <a href='#explore' className='text-4xl font-medium'>
              Explorer
            </a>
          </span>
          <span>
            <a href='#' className='text-4xl leading-8 font-medium'>
              Collections
            </a>
          </span>
          <span>
            <a href='#' className='text-4xl font-medium'>
              Launchpad
            </a>
          </span>
          <span>
            <a href='#' className='text-4xl font-medium'>
              Mint
            </a>
          </span>
        </div>
        <button
          className='flex items-center font-sfui font-bold rounded text-dark-text text-lg leading-[18px] bg-gold px-8 xl:px-[74px] py-4'
          onClick={setWalletPanel}
        >
          {connected
            ? `${(balance / 100_000_000).toFixed(5)} BTC`
            : `CONNECT WALLET`}
        </button>
      </div>
      <div
        className={`w-screen fixed z-[40] bg-dark-text flex flex-row lg:hidden justify-between items-center h-16 px-5 py-2.5${
          visibility && ' hidden'
        }`}
      >
        <img src={sLogo} alt='logo' className='w-[34px] h-[42px]' />
        <div className='flex flex-row gap-5 h-full items-center'>
          <button
            className='bg-gold h-full font-sfui font-bold text-sm leading-[14px] px-6 rounded text-dark-text'
            onClick={setWalletPanel}
          >
            {connected
              ? `${(balance / 100_000_000).toFixed(5)} BTC`
              : `CONNECT WALLET`}
          </button>
          <button className='anim-button' onClick={setNavbar}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
