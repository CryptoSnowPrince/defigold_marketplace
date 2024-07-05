import { useState, useEffect } from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
// import AnimatedText from 'animated-text-letters';
// import 'animated-text-letters/index.css';
// import { AnimatedDots } from 'animated-dots';
import { Zoom } from 'react-awesome-reveal';
import banner from '../assets/img/home-banner.png';
// import firstTap from '../assets/img/tap1.png';
// import secondTap from '../assets/img/tap2.png';
// import thirdTap from '../assets/img/tap3.png';
// import fourthTap from '../assets/img/tap4.png';
import AnimLine from '../assets/img/animated_lines.png';
import ExAnimLine from '../assets/img/ex_animated_lines.png';
import Card from './card';
import { getList } from './../utils/utils';
import { Link } from 'react-router-dom';
// import Banner from './banner';

const Home = () => {
  const [text, count] = useTypewriter({
    words: ['One Stop Shop for Lightening Taproot Assets'],
    loop: true,
    delaySpeed: 1000,
  });
  const bannerText = 'New Home for Bitcoin NFTs - ';
  const [tradeInscriptions, setTradeInscriptions] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getList();
      if (!list || list.length <= 0) {
        setTradeInscriptions([]);
      } else {
        console.log(list);
        setTradeInscriptions(list.slice(0, 4));
      }
      setLoaded(true);
    };
    fetchData();
  }, []);

  return (
    <div
      id='home'
      className='flex flex-col justify-center items-center w-screen lg:pt-60 pt-28 z-2 relative overflow-x-hidden'
    >
      <div className='h-[80px] lg:h-10 w-52 lg:w-full text-center'>
        <span className='z-10 text-gold font-sfui text-center mb-5 lg:text-[32px] lg:leading-10 w-52 lg:w-full text-lg leading-5'>
          One Stop Shop for Bitcoin NFTs
        </span>
      </div>
      <span className='z-10 font-teko font-light text-center mb-5 w-full lg:w-[1000px] text-7xl leading-[60px] lg:text-[168px] lg:leading-[152px]'>
        Secure Digital Artifacts Marketplace
      </span>
      <div className='z-10 flex flex-row gap-6 mb-5 text-sm leading-[14px] lg:text-lg lg:leading-[18px]'>
        <Link
          to='/collections'
          className='flex-1 text-center font-sfui w-32 lg:w-44 py-2 font-bold pt-2.5 bg-gold rounded text-dark-text'
        >
          Start Collecting
        </Link>
        <Link
          to='/mint'
          className='flex-1 text-center font-sfui w-32 lg:w-44 py-2 text-base-text font-medium bg-transparent border-2 border-gold rounded'
        >
          Mint BTC NFT
        </Link>
      </div>
      <img
        src={banner}
        alt='banner'
        className='z-10 scale-[1.03] lg:scale-100 ml-[-20px]'
      />
      <Zoom duration={2000} triggerOnce={false}>
        <div className='z-10 flex flex-col py-28 w-screen'>
          <span className='section-title px-5 pb-5 lg:pb-16'>
            Sponsored NFTs
          </span>
          <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-16 gap-4 m-auto justify-items-center'>
            {tradeInscriptions && tradeInscriptions.length > 0 ? (
              tradeInscriptions.map((item, index) => {
                return (
                  <Card
                    key={index}
                    resId={item.inscriptionId}
                    resNumber={item.inscriptionNumber}
                    address={item.address}
                    price={item.price}
                  />
                );
              })
            ) : (
              <div className='text-center col-span-2 lg:col-span-4 text-3xl'>
                <span>No Data Found</span>
              </div>
            )}
          </div>
        </div>
      </Zoom>
      {/* <div className='marquee text-5xl leading-[45px] text-dark-text'>
        <div className='marquee-content'>
          <span className='mr-1'>{bannerText.repeat(8)}</span>
          <span className='mr-1'>{bannerText.repeat(8)}</span>
        </div>
      </div> */}
      <div className='marquee text-5xl leading-[45px] text-dark-text'>
        <div className='marquee-content'>
          <span className='mr-1'>{bannerText.repeat(20)}</span>
          <span className='mr-1'>{bannerText.repeat(20)}</span>
        </div>
      </div>
      {/* <div className="z-10 bg-gold py-2 w-screen whitespace-nowrap box-border items-center">
        <div className="inline-block pl-[100%] text-anim">
          {/* <span className='inline-block lg:hidden pr-[100%] text-3xl leading-7 text-dark-text'>New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs</span>
          <span className='inline-block lg:hidden pr-[100%] text-3xl leading-7 text-dark-text'>New Home for Bitcoin NFTs&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;New Home for Bitcoin NFTs</span> */}
      {/* <span className="inline-block text-5xl leading-[45px] text-dark-text">
            {bannerText.repeat(4)}
          </span>
          <span className="inline-block text-5xl leading-[45px] text-dark-text">
            {bannerText.repeat(4)}
          </span>
        </div>
      </div> */}
      <div className='hidden lg:block right-anim z-0 top-0 overflow-hidden'>
        <img src={ExAnimLine} alt='lines' />
      </div>
      <div className='hidden lg:block z-0 left-anim top-0 overflow-hidden'>
        <img src={ExAnimLine} alt='lines' />
      </div>
      <div className='lg:hidden z-0 main-anim top-0 overflow-hidden'>
        <img src={AnimLine} alt='lines' />
      </div>
    </div>
  );
};

export default Home;
