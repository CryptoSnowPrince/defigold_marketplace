import { useEffect } from 'react';

const Collections = () => {
  useEffect(() => {
    console.log('here');
  }, []);
  return (
    <div className='px-2 flex flex-col pt-20 lg:pt-48 text-white w-screen h-full'>
      <div className='flex justify-end pb-4'>
        <a
          className='bg-gold w-fit px-2 py-1 text-dark-text rounded-sm text-lg'
          href='/creator'
        >
          Create Collection
        </a>
      </div>
      <table className='w-full'>
        <tr>
          <th>#</th>
          <th colSpan={2}>Collection</th>
          <th>Listed</th>
        </tr>
        <tr>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

export default Collections;
