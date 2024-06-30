import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/globalContext';
import { ORDINALS_URL } from '../utils/constants';
import { getInscriptionInfo, getList } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

const Detail = ({ setWalletPanel }) => {
  const navigate = useNavigate();
  const { resId } = useParams();
  const [assetInfo, setAssetInfo] = useState({});
  const {
    connected,
    ordinalsAddress,
    listInscription,
    delistInscription,
    buyInscription,
  } = useContext(GlobalContext);
  const [loadedData, setLoadedData] = useState(false);
  const [value, setValue] = useState({ listprice: '' });
  const [error, setError] = useState({});

  const checkValidation = (input, inputValue) => {
    let terror = 0;
    let message = '';
    switch (input) {
      case 'listprice':
        if (inputValue.length <= 0) {
          terror += 1;
          message = '0.1 BTC';
        } else {
          message = '';
        }
        break;
      default:
        terror += 0;
        break;
    }

    if (terror > 0) {
      setError({ ...error, [input]: message });
      return false;
    } else {
      setError({ ...error, [input]: '' });
      return true;
    }
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    checkValidation(e.target.name, e.target.value);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!resId) {
        navigate(`/`);
      }
      const _inscriptionData = await getInscriptionInfo(resId);
      if (!_inscriptionData) {
        navigate(`/`);
      }
      const list = await getList({ inscriptionIds: [resId] });
      if (list && list.length > 0) {
        _inscriptionData.price = list[0].price;
      }
      setAssetInfo(_inscriptionData);
      setLoadedData(true);
    };
    fetchData();
  }, [resId, navigate]);

  return (
    <div className='lg:py-60 py-28 px-56 text-center'>
      {!loadedData || !assetInfo || Object.keys(assetInfo).length <= 0 ? (
        <span className='text-center text-4xl'>Loading...</span>
      ) : (
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-16 gap-4 m-auto'>
          <Link
            className='w-full'
            to={`${ORDINALS_URL}/inscription/${resId}`}
            target='_blank'
          >
            <img
              className='rounded-lg w-full'
              src={`${ORDINALS_URL}/content/${resId}`}
              alt='taproot asset'
            />
          </Link>
          <div className='flex flex-col text-start gap-2'>
            <Link
              className='text-start text-gold text-6xl hover:text-opacity-15'
              to={`${ORDINALS_URL}/inscription/${resId}`}
              target='_blank'
            >
              {`#${assetInfo.inscriptionNumber}`}
            </Link>
            <span className='text-hint-text text-2xl'>
              Owned by{' '}
              <span className='text-gold hover:cursor-pointer'>
                {assetInfo.address}
              </span>
            </span>
            <div className='rounded-lg border-gray-500 border p-4'>
              {!connected && (
                <button
                  className='bg-gold w-full text-dark-text font-sfui text-lg py-2 rounded-lg flex gap-2 justify-center items-center'
                  onClick={setWalletPanel}
                >
                  CONNECT WALLET
                </button>
              )}
              {connected && assetInfo.address === ordinalsAddress.address && (
                <div className='flex flex-col w-full text-2xl gap-2'>
                  <span className='text-hint-text'>Price *</span>
                  <input
                    type='text'
                    className='bg-dark-box border rounded-lg border-gray-500 p-2'
                    name='listprice'
                    placeholder='0.1 BTC'
                    onChange={(e) => onChangeInput(e)}
                  />
                  <button className='bg-gold w-full text-dark-text font-sfui text-lg py-2 rounded-lg flex gap-2 justify-center items-center'>
                    <FontAwesomeIcon icon={faTags} />
                    {assetInfo.price ? `Edit Now` : `List Now`}
                  </button>
                </div>
              )}
              {connected &&
                assetInfo.address === ordinalsAddress.address &&
                assetInfo.price && (
                  <button
                    className='bg-gold w-full text-dark-text font-sfui text-lg py-2 rounded-lg flex gap-2 justify-center items-center'
                    onClick={() =>
                      delistInscription(assetInfo, 999_000_000_000_000)
                    }
                  >
                    <FontAwesomeIcon icon={faTags} /> Delist Now
                  </button>
                )}
              {connected &&
                assetInfo.address !== ordinalsAddress.address &&
                assetInfo.price && (
                  <button
                    className='bg-gold w-full text-dark-text font-sfui text-lg py-2 rounded-lg flex gap-2 justify-center items-center'
                    onClick={() => buyInscription(assetInfo.inscriptionId, 1)}
                  >
                    <FontAwesomeIcon icon={faTags} /> Buy Now
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
