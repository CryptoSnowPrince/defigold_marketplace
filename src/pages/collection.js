import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ALERT_ERROR_CONFIG, API_PATH, SUCCESS } from '../utils/constants';
import { toast } from 'react-toastify';
import Card from '../components/card';

const Collection = () => {
  const { symbol } = useParams();
  const [inscriptions, setInscriptions] = useState([]);
  useEffect(() => {
    // alert(symbol);
    const params = { symbol: symbol };
    const fetchData = async () => {
      const res = await axios.get(`${API_PATH}/collections/getCollection`, {
        params,
      });
      if (res.data.status === SUCCESS) {
        console.log(res.data.result);
        setInscriptions(res.data.result.inscriptions);
      } else {
        toast.error('Getting collection error', ALERT_ERROR_CONFIG);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='w-screen xl:px-56 px-5 lg:px-28'>
      {inscriptions && inscriptions.length > 0 && (
        <div className='lg:text-3xl font-sfui text-hint-text mt-4'>
          <span>{`Inscriptions: Total ${inscriptions.length} Items`}</span>
        </div>
      )}
      <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-16 gap-4 m-auto'>
        {inscriptions && inscriptions.length > 0 ? (
          inscriptions.map((item, index) => {
            return (
              <Card
                key={index}
                resId={item.inscriptionId}
                resNumber={item.inscriptionNumber}
                address={item.address}
                isListed={item.isListed}
                isOwner={true}
              />
            );
          })
        ) : (
          <div className='text-center lg:col-span-4 col-span-2 text-3xl'>
            <span>No Data Found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
