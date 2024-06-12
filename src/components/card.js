const Card = ({imgSrc, title, price}) => {
  return (
    <div className='rounded-md bg-dark-box flex flex-col lg:p-6 p-3 card-item'>
      <img src={imgSrc} className='w-[140px] h-[140px] lg:w-[280px] lg:h-[280px] pb-[14px] lg:pb-7 rounded-md' alt='tap_asset' />
      <span className='pl-1 text-lg leading-4 lg:text-4xl lg:leading-8 text-white pb-2 lg:pb-4'>
        {title}
      </span>
      <div className='flex flex-row p-2.5 lg:p-5 justify-between items-center bg-primary rounded-md'>
        <span className='text-light-text font-sfui text-xs leading-[10px] lg:text-xl lg:leading-5'>Price</span>
        <span className='text-gold font-bold text-sm leading-3 lg:text-xl lg:leading-[18px]'>{price} BTC</span>
      </div>
    </div>
  )
};

export default Card;
