import { useContext, useEffect } from 'react';
import { ORDINALS_URL } from '../utils/constants';
import { GlobalContext } from '../context/globalContext';
import { Link } from 'react-router-dom';

const Card = ({ resId, resNumber, address, price, isOwner }) => {
  const { connected, resAddress, wallet } = useContext(GlobalContext);
  useEffect(() => {}, []);

  return (
    <div className='rounded-md bg-dark-box p-[1px] card-item'>
      <div className='product-card z-10 lg:p-6 p-3 rounded-md relative bg-dark-box flex flex-col'>
        <Link to={`${ORDINALS_URL}/inscription/${resId}`} target='_blank'>
          <img
            src={`${ORDINALS_URL}/content/${resId}`}
            className='product-img w-[140px] h-[140px] lg:w-[280px] lg:h-[280px] pb-[14px] lg:pb-7 rounded-md'
            alt='tap_asset'
          />
        </Link>
        <span className='pl-1 text-lg leading-4 lg:text-4xl lg:leading-8 text-white pb-2 lg:pb-4'>
          {`Taproot Asset #${resNumber}`}
        </span>
        {isOwner ? (
          <Link
            className='bg-gold text-dark-text font-bold text-sm lg:text-xl p-1.5 lg:p-4 text-center rounded-md'
            to={`/detail/${resId}`}
          >
            List Now
          </Link>
        ) : (
          <>
            <div className='product-info flex flex-row p-2.5 lg:p-5 justify-between items-center bg-primary rounded-md'>
              <span className='text-light-text font-sfui text-xs leading-[10px] lg:text-xl lg:leading-5'>
                Price
              </span>
              <span className='text-gold font-bold text-sm leading-3 lg:text-xl lg:leading-[18px]'>
                {(price / 100_000_000).toFixed(4)} BTC
              </span>
            </div>
            <Link
              className='product-action bg-gold text-dark-text font-bold text-sm lg:text-xl p-1.5 lg:p-4 text-center rounded-md'
              to={`/detail/${resId}`}
            >
              {!connected
                ? 'View'
                : resAddress === address
                ? 'Edit Now'
                : 'Buy Now'}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
