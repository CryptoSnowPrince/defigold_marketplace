const Article1 = () => {
  return (
    <div className='flex flex-col lg:pt-60 pt-28 px-5 sm:px-20 md:px-28 xl:px-36 justify-center mx-auto'>
      <p className='text-5xl pb-5'>
        Understanding Ordinals and Runes in Bitcoin
      </p>
      <p className='text-3xl pt-5 pb-3'>What are Ordinals?</p>
      <span className='font-sfui'>
        <span className='font-teko text-2xl'>Ordinals</span> in Bitcoin are a
        method to assign unique identities to individual satoshis (the smallest
        unit of Bitcoin). Here’s how it works:
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>1. Satoshis</span> are the smallest
        fraction of a Bitcoin, much like cents are to a dollar.
      </span>
      <span className='font-sfui ml-8'>
        2. Ordinals allow each satoshi to be uniquely numbered or labeled.
      </span>
      <span className='font-sfui ml-8'>
        3. This labeling system helps in tracking and differentiating individual
        satoshis from one another.
      </span>
      <span className='font-sfui pt-5'>
        Think of it like serial numbers on dollar bills. Even though all bills
        of the same denomination have the same value, the serial number makes
        each bill unique.
      </span>
      <p className='text-3xl pt-5 pb-3'>What are Runes?</p>
      <span className='font-sfui'>
        <span className='font-teko text-2xl'>Runes</span>
        are specialized instructions or scripts that can be attached to Bitcoin
        transactions. They dictate specific behaviors or conditions for those
        transactions. Here’s a breakdown:
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>1. Commands:</span> Runes are
        essentially sets of commands that you can add to Bitcoin transactions.
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>2. Conditions:</span> These
        commands can set rules about when and how the Bitcoin can be spent or
        transferred.
      </span>
      <span className='font-sfui pt-5'>
        Imagine Runes as programmable features that allow you to customize how
        your Bitcoin behaves. For example, you might have a Rune that only
        allows the Bitcoin to be spent after a certain date or if certain
        conditions are met.
      </span>
      <p className='text-3xl pt-5 pb-3'>How Do They Work Together?</p>
      <span className='font-sfui py-3'>
        Ordinals and Runes can interact to make Bitcoin more versatile and
        functional. Here’s an example:
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>• Ordinals</span> provide a unique
        identifier to each satoshi, allowing you to track them individually.
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>• Runes</span> allow you to program
        specific conditions and rules for how those satoshis can be used.
      </span>
      <span className='font-sfui pt-3'>
        By combining these two features, you can create sophisticated and
        flexible Bitcoin transactions. For instance, you could label a satoshi
        with an Ordinal to track its journey and use a Rune to set spending
        conditions based on time, ownership, or other criteria.
      </span>
      <p className='text-3xl pt-5 pb-3'>Why Are They Important?</p>
      <span className='font-sfui pb-5'>
        Ordinals and Runes bring several benefits to the Bitcoin ecosystem:
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>1. Enhanced Functionality:</span>{' '}
        They add layers of functionality to Bitcoin transactions, making them
        more versatile.
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>2. Improved Tracking:</span> With
        Ordinals, tracking individual satoshis becomes possible, which can be
        useful for various applications, such as collectibles or ensuring the
        integrity of transactions.
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>
          3. Customizable Transactions:
        </span>{' '}
        Runes allow users to customize transactions in ways that were not
        previously possible, adding more control and security.
      </span>
      <p className='font-sfui pt-5 pb-3'>In summary:</p>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>• Ordinals</span> are unique
        identifiers for individual satoshis, similar to serial numbers on
        currency.
      </span>
      <span className='font-sfui ml-8'>
        <span className='font-teko text-2xl'>• Runes</span> are programmable
        instructions that dictate specific behaviors and conditions for Bitcoin
        transactions.
      </span>
      <span className='font-sfui ml-8'>
        • Together, they enhance the functionality, tracking, and customization
        of Bitcoin, making it more versatile and powerful.
      </span>
      <span className='font-sfui pt-3'>
        You can buy and sell Ordinal NFTs on DeFi.Gold and even{' '}
        <a href='https://nft.defi.gold/mint' className='text-sky-600 underline'>
          mint
        </a>{' '}
        your own. This platform provides a user-friendly way to explore the
        potential of Ordinals in the world of digital collectibles and beyond.
      </span>
    </div>
  );
};

export default Article1;
