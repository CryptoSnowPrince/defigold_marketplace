import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getList } from '../utils/utils';
import Card from '../components/card';

const Explorer = () => {
  const [listedData, setListedData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const _inscriptions = await getList();
      setListedData(_inscriptions);
      setLoaded(true);
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col lg:py-60 py-28 xl:px-56 px-5 lg:px-28'>
      <div className='flex flex-col pt-10 pb-20 gap-4 justify-center items-center relative'>
        <span className='font-sfui text-white text-center lg:text-6xl font-bold text-xl'>
          Taproot Asset Explorer
        </span>
        <span className='font-sfui text-hint-text text-center'>
          Trade your NFT in a trusted marketplace.
        </span>
        <div className='flex flex-row relative p-1 bg-primary rounded-lg border w-1/2 border-gray-500 h-fit'>
          <input
            type='text'
            placeholder='Search Here'
            className='bg-transparent outline-none w-full text-lg p-2.5'
          />
          <button className='rounded-xl border-2 bg-dark-box hover:bg-gold hover:border-gold h-fit border-gray-500 p-2 absolute top-1 right-1 bottom-1'>
            <MagnifyingGlassIcon className='h-6 w-6 text-white' />
          </button>
        </div>
        <div className='z-[-1] absolute top-0 start-0 end-0 bottom-0 bg-gold blur-[160px] opacity-10'></div>
      </div>
      {listedData && listedData.length && (
        <div className=' mb-6 font-sfui'>
          <span className='text-hint-text text-lg'>{`Total ${listedData.length} Items`}</span>
        </div>
      )}
      <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-16 gap-4 m-auto'>
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
          <div className='text-center col-span-2 lg:col-span-4 text-3xl'>
            <span>No Data Found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
