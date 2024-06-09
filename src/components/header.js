import Logo from '../assets/img/Logo.svg';

const Header = () => {
  return (
    <div className='w-screen flex flex-row items-center justify-between h-36 pt-[72px] pb-8 px-8 xl:px-[69px] sm:h-20'>
      <div className='flex flex-row pl-6 xl:pl-10 items-center'>
        <img src={Logo} className='w-48' alt='logo' />
      </div>
      <div className='flex flex-row flex-1 items-center justify-around xl:justify-center xl:gap-16'>
        <span>
          <a href='#home' className='text-4xl font-medium'>Home</a>
        </span>
        <span>
          <a href='#explore' className='text-4xl font-medium'>Explorer</a>
        </span>
        <span>
          <a href='#' className='text-4xl leading-8 font-medium'>Collections</a>
        </span>
        <span>
          <a href='#' className='text-4xl font-medium'>Launchpad</a>
        </span>
        <span>
          <a href='#' className='text-4xl font-medium'>Mint</a>
        </span>
      </div>
      <button className='flex items-center font-sfui font-bold rounded text-dark-text text-lg leading-[18px] bg-gold px-8 xl:px-[74px] py-4'>CONNECT WALLET</button>
    </div>
  );
}

export default Header;
