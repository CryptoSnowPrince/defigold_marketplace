import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Commet } from 'react-loading-indicators';
import ReactPaginate from 'react-paginate';
import {
  ALERT_ERROR_CONFIG,
  API_PATH,
  DOWNLOAD_PATH,
  SUCCESS,
} from '../utils/constants';
import CollectionCard from '../components/collectioncard';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData');
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
        setCurrentItems(items.slice(itemOffset, 4));
        setPageCount(Math.ceil(items.length / 4));
        setLoadingVisibility(false);
      } else {
        toast.error(res.data.message, ALERT_ERROR_CONFIG);
      }
    };
    setLoadingVisibility(true);
    fetchData();
  }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % collections.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    const endOffset = newOffset + 4;
    const items = collections.slice(newOffset, endOffset);
    setCurrentItems(items);
    setItemOffset(newOffset);
  };

  return (
    <div className='px-4 flex flex-col pt-24 lg:pt-48 text-white w-screen h-full'>
      <div className='flex justify-end pb-4'>
        <a
          className='bg-gold w-fit px-2 py-1 text-dark-text rounded-sm text-lg'
          href='/creator'
        >
          Create Collection
        </a>
      </div>
      {loadingVisibility ? (
        <div className='w-full h-full py-20 mx-auto flex justify-center'>
          <Commet color='#ebad2c' size='medium' text='' textColor='' />
        </div>
      ) : (
        <>
          <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-16 gap-4 m-auto'>
            {collections && collections.length > 0 ? (
              currentItems.map((item, index) => {
                return <CollectionCard key={index} collection={item} />;
              })
            ) : (
              <div className='text-center col-span-2 lg:col-span-4 text-3xl'>
                <span>No Data Found</span>
              </div>
            )}
          </div>
          {collections && collections.length > 0 && (
            <div className='flex flex-row'>
              <ReactPaginate
                className='flex flex-row gap-6 pt-8 w-full justify-center'
                breakLabel='...'
                nextLabel='Next'
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel='Prev'
                previousLinkClassName='bg-slate-400 rounded-full px-4 py-1'
                nextLinkClassName='bg-slate-400 rounded-full px-4 py-1'
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </>
      )}
      {/* <table className='w-full'>
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
      </table> */}
    </div>
  );
};

export default Collections;
