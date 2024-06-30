import logo from '../assets/img/sm_Logo.svg';
import union from '../assets/img/Union.png';

const Navbar = ({ showNavbar, modifyNavbar }) => {
  return (
    <div
      className={`flex flex-col h-0 w-screen navbar${
        showNavbar ? '-show' : ''
      } overflow-hidden bg-primary`}
    >
      <div className='flex flex-row justify-between items-center h-16 px-5 py-2.5'>
        <img src={logo} alt='logo' className='w-[34px] h-[42px]' />
        <div className='flex flex-row gap-5 h-full items-center'>
          <button className='bg-gold h-full font-sfui font-bold text-sm leading-[14px] px-6 rounded text-dark-text'>
            PRESENTATION
          </button>
          <button className='mini-button' onClick={modifyNavbar}>
            <div className='h-[2px] w-full bg-white'></div>
          </button>
        </div>
      </div>
      <div className='flex flex-col h-[calc(100vh-64px)] overflow-y-auto'>
        <div className='flex flex-col pl-10'>
          <a href='/' className='nav-item' onClick={modifyNavbar}>
            Home
          </a>
          <a href='/explorer' className='nav-item' onClick={modifyNavbar}>
            Explorer
          </a>
          <a href='#' className='nav-item' onClick={modifyNavbar}>
            Collections
          </a>
          <a href='#' className='nav-item' onClick={modifyNavbar}>
            Launchpad
          </a>
          <a href='/mint' className='nav-item' onClick={modifyNavbar}>
            Mint
          </a>
        </div>
        <div className='flex flex-col px-5 py-8'>
          <span className='py-5 text-gold font-sfui font-semibold text-lg leading-[22px]'>
            Subscribe for News, Updates and Articles
          </span>
          <input
            type='email'
            placeholder='E-mail'
            className='py-4 px-[18px] border-solid border-[1px] border-[#F8F8F81A] rounded-md bg-transparent mx-[1px] font-sfui text-base leading-5 placeholder:text-hint-text mb-3'
          />
          <button className='bg-base-text rounded-md text-dark-text px-6 py-4 text-base leading-4 font-bold font-sfui'>
            SUBSCRIBE NOW
          </button>
        </div>
        <div className='bg-[#111111] pb-2 px-[120px] border-t-[1px] border-t-[#f8f8f81a] border-solid'>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row gap-[6px] items-center'>
              <img src={union} alt='lock' className='w-3 h-3' />
              <span className='py-3 mx-auto text-[#676b6c] text-sm leading-[14px] font-sfui'>
                defi.gold
              </span>
            </div>
            <div className='w-full h-[3px] rounded bg-white'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
