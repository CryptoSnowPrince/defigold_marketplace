import { DOWNLOAD_PATH } from '../utils/constants';

const CollectionCard = ({ collection }) => {
  const getCollection = (symbol) => {
    window.location.href = `/collection/${symbol}`;
  };

  return (
    <div className='rounded-md bg-dark-box p-[1px] card-item'>
      <div
        className='product-card z-10 lg:p-6 p-3 rounded-md relative bg-dark-box flex flex-col hover:cursor-pointer'
        onClick={() => getCollection(collection.symbol)}
      >
        <img
          src={collection.logo}
          className='object-cover w-[140px] h-[140px] lg:w-[280px] lg:h-[280px] pb-[14px] lg:pb-7 rounded-md'
          alt='tap_asset'
        />
        <span className='pl-1 text-lg leading-4 lg:text-4xl lg:leading-8 text-white pb-2 lg:pb-4'>
          {collection.title}
        </span>
        <div className='flex flex-row p-2.5 lg:p-4 xl:p-5 justify-between items-center bg-primary rounded-md'>
          <span className='text-light-text font-sfui text-xs leading-[10px] lg:text-lg lg:leading-4 xl:text-xl xl:leading-5'>
            {`${parseInt((100 * collection.listed) / collection.total)}%`}
          </span>
          <span className='text-gold font-bold max-lg:text-sm max-lg:leading-3 leading-4 xl:text-xl xl:leading-[18px]'>
            {`${collection.listed}/${collection.total} listed`}
          </span>
        </div>
        {/* <Link
          className='product-action bg-gold text-dark-text font-bold text-sm lg:text-xl p-1.5 lg:p-2.5 xl:p-4 text-center rounded-md'
          to={`/detail/${resId}`}
        >
          {!connected
            ? 'View'
            : resAddress === address
            ? 'Edit Now'
            : 'Buy Now'}
        </Link> */}
      </div>
    </div>
  );
};

export default CollectionCard;
