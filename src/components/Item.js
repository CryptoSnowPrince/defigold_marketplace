import ArrowBtn from '../assets/img/arrow.svg';

const Item = ({ imgSrc, title, link }) => {
  return (
    <div className='start-item flex-1 flex flex-col'>
      <img
        src={imgSrc}
        alt='tap1'
        className='rounded-tl-[5px] rounded-tr-[5px] border-b-0'
      />
      <div className='flex flex-grow flex-row mt-[-1px] lg:mt-[-2px]'>
        <span className='flex-1 items-center flex px-[18px] py-4 rounded-bl-[5px] bg-dark-box text-light-text text-base leading-[19px] lg:leading-7 font-sfui'>
          {title}
        </span>
        <span className='rounded-br-[5px] bg-gold w-[77px] lg:w-[118px] flex items-center justify-center'>
          <a href={link} className='arrow-image-container'>
            <img
              src={ArrowBtn}
              alt='arrow'
              className='h-[30px] lg:h-12 arrow-image'
            />
            <div className='arrow-shine'></div>
          </a>
        </span>
      </div>
    </div>
  );
};

export default Item;
