import { useEffect, useState } from 'react';
import {
  ALERT_ERROR_CONFIG,
  API_PATH,
  DOWNLOAD_PATH,
  SUCCESS,
} from '../utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_PATH}/collections/getCollections`);
      console.log(res);
      if (res.data.status === SUCCESS) {
        const items = res.data.result.map((item) => {
          return {
            symbol: item.symbol,
            logo: `${DOWNLOAD_PATH}/${item.image}`,
            title: item.title,
            listed: item.listed,
            total: item.total,
          };
        });
        setCollections(items);
      } else {
        toast.error(res.data.message, ALERT_ERROR_CONFIG);
      }
    };
    fetchData();
  }, []);

  const getCollection = (symbol) => {
    window.location.href = `/collection/${symbol}`;
  };

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
          <th className='w-4'>#</th>
          <th colSpan={2}>Collection</th>
          <th>Listed</th>
        </tr>
        {collections.length > 0 ? (
          collections.map((item, index) => {
            return (
              <tr
                key={index}
                className='hover:bg-gray-500 hover:cursor-pointer'
                onClick={() => {
                  getCollection(item.symbol);
                }}
              >
                <td className='text-center'>{index + 1}</td>
                <td className='w-16'>
                  <img
                    src={item.logo}
                    className='rounded-full w-16 h-16 object-cover p-2'
                  />
                </td>
                <td>{item.title}</td>
                <td className='flex flex-col text-center'>
                  <span className='text-white'>
                    {parseInt((100 * item.listed) / item.total)}%
                  </span>
                  <span className='text-gray-700'>{`${item.listed}/${item.total}`}</span>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4} className='text-center text-2xl'>
              No collections found
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default Collections;
