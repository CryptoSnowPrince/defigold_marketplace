import { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import firstTap from '../assets/img/tap5.png';
import secondTap from '../assets/img/tap6.png';
import thirdTap from '../assets/img/tap7.png';
import fourthTap from '../assets/img/tap8.png';
import sunLight from '../assets/img/sun.png';
import Card from './card';
import { getList } from '../utils/utils';

const Explore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('Art');
  const [listedData, setListedData] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getList();
      if (!list || list.length <= 0) {
        setListedData([]);
      } else {
        console.log(list);
        setListedData(list.slice(0, 8));
      }
      setLoaded(true);
    };
    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateFilter = (val) => {
    setIsOpen(!isOpen);
    setFilter(val);
  };

  return (
    <div id='explore'>
      <Zoom duration={2000} triggerOnce={false}>
        <div className='flex flex-col w-screen px-5 pt-20 lg:pt-48 overscroll-x-hidden'>
          <span className='flex pb-5 lg:pb-12 lg:justify-center section-title'>
            Explore NFTs
          </span>
          <div className='hidden lg:flex flex-row w-full gap-2.5 pb-[30px] lg:gap-8 lg:pb-[60px] justify-center'>
            <button
              className='explore-tag-item'
              onClick={() => setFilter('Art')}
            >
              Art
            </button>
            <button
              className='explore-tag-item'
              onClick={() => setFilter('Collections')}
            >
              Collections
            </button>
            <button
              className='explore-tag-item'
              onClick={() => setFilter('Domain Names')}
            >
              Domain Names
            </button>
            <button
              className='explore-tag-item'
              onClick={() => setFilter('Music')}
            >
              Music
            </button>
            <button
              className='explore-tag-item'
              onClick={() => setFilter('Phtography')}
            >
              Photography
            </button>
            <button
              className='explore-tag-item'
              onClick={() => setFilter('Others')}
            >
              Others
            </button>
          </div>
          <div className='lg:hidden flex flex-row w-full gap-2.5 pb-[30px] ml-2 lg:ml-0 lg:gap-8 lg:pb-[60px] relative items-center'>
            <button className='explore-tag-item' onClick={toggleDropdown}>
              {filter}
            </button>
            {isOpen ? (
              <div
                className='mini-filter-icon flex flex-col items-center'
                onClick={toggleDropdown}
              >
                <div className='h-[2px] w-full bg-white'></div>
              </div>
            ) : (
              <div className='filter-icon' onClick={toggleDropdown}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
            {isOpen && (
              <div className='dropdown-menu'>
                <button
                  className='explore-tag-item'
                  onClick={() => updateFilter('Art')}
                >
                  Art
                </button>
                <button
                  className='explore-tag-item'
                  onClick={() => updateFilter('Collections')}
                >
                  Collections
                </button>
                <button
                  className='explore-tag-item'
                  onClick={() => updateFilter('Domain Names')}
                >
                  Domain Names
                </button>
                <button
                  className='explore-tag-item'
                  onClick={() => updateFilter('Music')}
                >
                  Music
                </button>
                <button
                  className='explore-tag-item'
                  onClick={() => updateFilter('Photography')}
                >
                  Photography
                </button>
                <button
                  className='explore-tag-item'
                  onClick={() => updateFilter('Others')}
                >
                  Others
                </button>
              </div>
            )}
          </div>
          {/* <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-16 gap-4 m-auto'></div> */}
          <div className='grid lg:grid-cols-4 grid-cols-2 pb-[55px] lg:gap-16 lg:pb-[405px] gap-4 mx-auto justify-center'>
            {listedData && listedData.length > 0 ? (
              listedData.map((item, index) => {
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
              <div className='text-center lg:col-span-4 col-span-2 text-3xl'>
                <span>No Data Found</span>
              </div>
            )}
            {/* <Card imgSrc={firstTap} title="Taproot Asset #34118" price={0.0001} />
          <Card
            imgSrc={secondTap}
            title="Taproot Asset #34118"
            price={0.0001}
          />
          <Card imgSrc={thirdTap} title="Taproot Asset #34118" price={0.0001} />
          <Card
            imgSrc={fourthTap}
            title="Taproot Asset #34118"
            price={0.0001}
          /> */}
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export default Explore;
