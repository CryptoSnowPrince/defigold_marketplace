import React, { useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { copyToClipBoard, getDisplayString } from '../utils/utils';
import { WALLETS } from '../utils/constants';
import { GlobalContext } from '../context/globalContext';
import { Link } from 'react-router-dom';
import BtcIcon from '../assets/img/bitcoin.svg';
import OrdIcon from '../assets/img/ordinals.png';

const WalletModal = ({ visible, setVisible }) => {
  const {
    connected,
    login,
    logout,
    paymentAddress,
    ordinalsAddress,
    satBalance,
    inscriptions,
  } = useContext(GlobalContext);

  const walletPanelRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        walletPanelRef.current &&
        !walletPanelRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        visible ? 'flex' : 'hidden'
      } justify-end bg-black bg-opacity-50 transition-opacity duration-1000 text-xl`}
    >
      <div
        ref={walletPanelRef}
        className={`bg-primary w-[400px] lg:border-l-[1px] border-gray-500 h-full transform transition-transform duration-1000 ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='offcanvas-header border-b-[1px] border-gray-500 p-4'>
          <button
            type='button'
            className='btn-close'
            aria-label='Close'
            onClick={() => setVisible(false)}
          ></button>
        </div>
        <div className='offcanvas-body p-4'>
          <ul className='list-none'>
            {connected ? (
              <div className='grid grid-rows-4 gap-2'>
                <li className='mb-2'>
                  <div className='btn btn-sm text-start border-2 border-gray-500 hover:border-transparent rounded-lg w-full'>
                    <div className='flex items-center'>
                      <div className='pt-1'>
                        <img src={OrdIcon} width='32px' alt='ord' />
                      </div>
                      <div className='flex-col'>
                        <p className='ps-3 mb-0'>
                          {`Ordinals: ${getDisplayString(
                            ordinalsAddress.address,
                            4,
                            4
                          )} `}
                          <span>
                            <FontAwesomeIcon
                              icon={faCopy}
                              role='button'
                              onClick={() =>
                                copyToClipBoard(ordinalsAddress.address)
                              }
                            />
                          </span>
                        </p>
                        <Link to={`/profile/${ordinalsAddress.address}`}>
                          <p className='ps-3 mb-0 text-gold'>{`My ${
                            inscriptions &&
                            inscriptions?.total &&
                            typeof inscriptions.total === 'number'
                              ? inscriptions.total
                              : '...'
                          } NFTs`}</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='mb-2'>
                  <div className='btn btn-sm text-start border-2 border-gray-500 hover:border-transparent active:border-transparent rounded-lg w-full'>
                    <div className='flex items-center'>
                      <img src={BtcIcon} width='32px' alt='btc' />
                      <div className='flex-col'>
                        <p className='ps-3 mb-0'>
                          {`Payments: ${getDisplayString(
                            paymentAddress.address,
                            4,
                            4
                          )} `}
                          <span>
                            <FontAwesomeIcon
                              icon={faCopy}
                              role='button'
                              onClick={() =>
                                copyToClipBoard(paymentAddress.address)
                              }
                            />
                          </span>
                        </p>
                        <p className='ps-3 mb-0 text-gold'>{`${(
                          satBalance / 100_000_000
                        ).toFixed(5)} BTC`}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='btn-sm flex items-center mb-2 border-2 border-gray-500 hover:border-transparent active:border-transparent rounded-lg'>
                  <Link
                    className='text-start w-full'
                    to={`/profile/${ordinalsAddress.address}`}
                  >
                    <span className='ps-2'>{`My ${
                      inscriptions &&
                      inscriptions?.total &&
                      typeof inscriptions.total === 'number'
                        ? inscriptions.total
                        : '...'
                    } NFTs`}</span>
                  </Link>
                </li>
                <li className='mb-2 flex items-center btn-sm border-2 border-gray-500 hover:border-transparent active:border-transparent rounded-lg'>
                  <button
                    className='text-start w-full'
                    onClick={() => logout()}
                  >
                    <span className='ps-2'>Disconnect</span>
                  </button>
                </li>
              </div>
            ) : (
              WALLETS.map((item, index) => (
                <li className='mb-2' key={index}>
                  <button
                    className='btn btn-sm text-start border-2 border-gray-500 hover:border-transparent active:border-transparent rounded-lg p-2 w-full flex items-center'
                    onClick={() => login(item.name)}
                  >
                    <img src={item.icon} width='30px' alt={item.name} />
                    <span className='ps-3'>{item.name}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
