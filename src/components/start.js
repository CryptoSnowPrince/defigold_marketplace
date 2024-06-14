import firstTap from "../assets/img/tap9.png";
import secondTap from "../assets/img/tap10.png";
import thirdTap from "../assets/img/tap11.png";
import Item from "./Item";

const Start = () => {
  return (
    <div id="start" className="flex flex-col w-screen road-bg">
      <span className="text-center section-title pt-5 lg:pt-[68px] pb-7 lg:pb-[88px]">
        Getting Started
      </span>
      <div className="flex flex-col lg:flex-row gap-[30px] xl:gap-14 w-screen px-10 xl:px-56 pb-[58px] xl:pb-[202px]">
        <Item
          imgSrc={firstTap}
          title="Taproot Assets: An Overview of Bitcoin NFTs"
        />
        <Item
          imgSrc={secondTap}
          title="Bitcoin Taproot Assets — A Gamechanger"
        />
        <Item
          imgSrc={thirdTap}
          title="Are Bitcoin Taproot Assets The Next Big Thing?"
        />
        {/* <div className='flex-1 flex flex-col'>
          <img src={firstTap} alt='tap1' className='rounded-tl-[5px] rounded-tr-[5px] border-b-0' />
          <div className='flex flex-row mt-[-1px] lg:mt-[-2px]'>
            <span className='flex-1 px-[18px] py-4 rounded-bl-[5px] bg-dark-box text-light-text text-base leading-[19px] lg:px-7 lg:text-2xl lg:leading-7 font-sfui'>
              Taproot Assets: An Overview of Bitcoin NFTs
            </span>
            <span className='rounded-br-[5px] bg-gold w-[77px] lg:w-[118px] flex items-center justify-center'>
              <img src={ArrowBtn} alt='arrow' className='h-[30px] lg:h-12' />
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <img
            src={secondTap}
            alt="tap2"
            className="rounded-tl-[5px] rounded-tr-[5px] border-b-0"
          />
          <div className="flex flex-row mt-[-1px] lg:mt-[-2px]">
            <span className="flex-1 px-[18px] py-4 rounded-bl-[5px] bg-dark-box text-light-text text-base leading-[19px] lg:px-7 lg:text-2xl lg:leading-7 font-sfui">
              Bitcoin Taproot Assets — A Gamechanger
            </span>
            <span className="rounded-br-[5px] bg-gold w-[77px] lg:w-[118px] flex items-center justify-center">
              <img src={ArrowBtn} alt="arrow" className="h-[30px] lg:h-12" />
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <img
            src={thirdTap}
            alt="tap3"
            className="rounded-tl-[5px] rounded-tr-[5px] border-b-0"
          />
          <div className="flex flex-row mt-[-1px] lg:mt-[-2px]">
            <span className="flex-1 px-[18px] py-4 rounded-bl-[5px] bg-dark-box text-light-text text-base leading-[19px] lg:px-7 lg:text-2xl lg:leading-7 font-sfui">
              Are Bitcoin Taproot Assets The Next Big Thing?
            </span>
            <span className="rounded-br-[5px] bg-gold w-[77px] lg:w-[118px] flex items-center justify-center">
              <img src={ArrowBtn} alt="arrow" className="h-[30px] lg:h-12" />
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Start;
