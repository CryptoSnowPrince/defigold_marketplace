import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { GlobalContext } from '../context/globalContext';
import { NETWORK } from '../utils/constants';
import validate from 'bitcoin-address-validation';
import {
  copyToClipBoard,
  getDisplayString,
  getInscriptions,
} from '../utils/utils';
import BtcIcon from '../assets/img/bitcoin.svg';
import Card from '../components/card';

const Profile = () => {
  const navigate = useNavigate();
  const { wallet } = useParams();
  const { ordinalsAddress, inscriptions } = useContext(GlobalContext);
  const [walletInscriptions, setWalletInscriptions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!wallet) navigate(`/`);
      const retVal = validate(wallet, NETWORK);
      if (!retVal) navigate(`/`);
      console.log(wallet, ordinalsAddress);
      if (wallet !== ordinalsAddress.address) {
        const _inscriptions = await getInscriptions(wallet);
        console.log(_inscriptions.inscription);
        setWalletInscriptions(_inscriptions.inscription);
      } else {
        console.log(inscriptions);
        setWalletInscriptions(inscriptions.inscription);
      }
      setLoaded(true);
    };
    fetchData();
  }, [
    wallet,
    ordinalsAddress.addres,
    inscriptions,
    setWalletInscriptions,
    navigate,
  ]);

  return (
    <div className='lg:py-60 py-28 xl:px-56 px-5 lg:px-28 flex flex-col'>
      {/* <div
        className='relative flex justify-end bg-no-repeat bg-bottom-center h-[150px]'
        style={{
          backgroundImage: 'url(/assets/images/collection-details.png)',
        }}
      ></div> */}
      <div className='flex flex-col gap-4'>
        <div className='rounded-lg'>
          <img
            src='/assets/images/avatar.jpg'
            alt='avatar'
            className='rounded-lg w-28 border-4 border-gray-500'
          />
        </div>
        <div className='flex'>
          <img src={BtcIcon} className='w-6' alt='btc' />
          <span className='ps-2 text-xl mr-2'>{`Payments: ${getDisplayString(
            wallet,
            6,
            6
          )}`}</span>
          <FontAwesomeIcon
            icon={faCopy}
            role='button'
            onClick={() => copyToClipBoard(wallet)}
          />
        </div>
        <hr />
        {walletInscriptions && walletInscriptions.length > 0 && (
          <div className='lg:text-3xl font-sfui text-hint-text mt-4'>
            <span>{`Inscriptions: Total ${walletInscriptions.length} Items (You can't see unconfirmed inscriptions.)`}</span>
          </div>
        )}
        <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-16 gap-4 m-auto'>
          {walletInscriptions && walletInscriptions.length > 0 ? (
            walletInscriptions.map((item, index) => {
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
    </div>
  );
};

export default Profile;
