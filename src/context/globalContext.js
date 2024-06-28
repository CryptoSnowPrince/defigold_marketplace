import validate, {
  getAddressInfo as getAddressFormat,
} from 'bitcoin-address-validation';
import { useCallback, useState, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  signMessage as signMessageXverse,
  signTransaction,
} from 'sats-connect';
import {
  ALERT_SUCCESS_CONFIG,
  ALERT_WARN_CONFIG,
  ALERT_ERROR_CONFIG,
  NETWORK,
  REFETCH,
  ADDR_FOR_PAYMENTS,
  NET_TYPE_TEST,
  NET_TYPE_MAIN,
  NET_TYPE_LIVE,
  ADDR_TYPE_SH,
  ADDR_TYPE_WPKH,
  ADDR_TYPE_TR,
  ADDR_TYPE_SH_WPKH,
  SPLIT_CNT,
  SPLIT_SIZE,
  FEE_SATS,
  network,
  xverseNetwork,
  MIN_WALLET_SATS,
  ADDR_TYPE_PKH,
  MEMPOOL_URL,
} from '../utils/constants';
import {
  getAddressInfoByUnisat,
  getInscriptions,
  getRecommendFee,
  getBtcUtxoByUnisat,
  getPsbtInput,
  mergeBuySellPsbtAndBroadcast,
  listItem,
  getList,
  delistItem,
  delistItemById,
  getLinkComponent,
  postTx,
  getAddressUtxo,
  isOwnerOfUtxo,
} from '../utils/utils';
import * as ecc from '@bitcoinerlab/secp256k1';
window.Buffer = Buffer; // Make Buffer available globally
const { Psbt, Transaction, initEccLib } = require('bitcoinjs-lib');
initEccLib(ecc);

export const GlobalContext = createContext({});

export function useGlobalContext() {
  const [refetch, setRefetch] = useState(true);
  const [feeData, setFeeData] = useState({
    fastestFee: 0,
    halfHourFee: 0,
    hourFee: 0,
    economyFee: 0,
    minimumFee: 0,
  });

  const unisat = window?.unisat;
  const LeatherProvider = window?.LeatherProvider;
  const XverseProviders = window?.XverseProviders;

  const [wallet, setWallet] = useState('');
  const [connected, setConnected] = useState(false);

  const [satBalance, setSatBalance] = useState(0);
  const [utxos, setUtxos] = useState({});
  const [inscriptions, setInscriptions] = useState({});

  const [paymentAddress, setPaymentAddress] = useState({
    address: '',
    type: '',
    addressType: '',
    publicKey: '',
    derivationPath: '',
    symbol: '',
    purpose: '',
  });
  const [ordinalsAddress, setOrdinalsAddress] = useState({
    address: '',
    type: '',
    addressType: '',
    derivationPath: '',
    publicKey: '',
    symbol: '',
    tweakedPublicKey: '',
    purpose: '',
  });

  const login = useCallback(
    async (walletName) => {
      if (connected) {
        toast.warn('Already Connected', ALERT_WARN_CONFIG);
        return;
      }
      try {
        setWallet(walletName);
        switch (walletName) {
          case 'Xverse':
            if (!XverseProviders) {
              toast.warn('Install Xverse Wallet!', ALERT_WARN_CONFIG);
              return;
            }
            const getAddressOptions = {
              payload: {
                purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
                message: 'Address for receiving Ordinals and payments',
                network: {
                  type: xverseNetwork,
                },
              },
              onFinish: (response) => {
                const ordinalsAddress = response.addresses.find(
                  (address) => address.purpose === 'ordinals'
                );
                const paymentAddress = response.addresses.find(
                  (address) => address.purpose === 'payment'
                );

                if (paymentAddress.addressType === ADDR_TYPE_SH) {
                  paymentAddress.addressType = ADDR_TYPE_SH_WPKH;
                }

                if (ordinalsAddress.addressType === ADDR_TYPE_SH) {
                  ordinalsAddress.addressType = ADDR_TYPE_SH_WPKH;
                }

                setOrdinalsAddress(ordinalsAddress);
                setPaymentAddress(paymentAddress);
                toast.success('Xverse Wallet Connected!', ALERT_SUCCESS_CONFIG);
                setConnected(true);
              },
              onCancel: () => {
                toast.error('Fail Xverse Wallet Connect!', ALERT_ERROR_CONFIG);
                setConnected(false);
              },
            };

            await getAddress(getAddressOptions);
            break;
          case 'Unisat':
            if (!unisat) {
              toast.warn('Install Unisat Wallet!', ALERT_WARN_CONFIG);
              return;
            }
            const result = await unisat.requestAccounts();
            console.log('hhhhh', result);
            if (result.length > 0) {
              let network = await unisat.getNetwork();
              console.log(network);
              if (network === NET_TYPE_LIVE) {
                network = NET_TYPE_MAIN;
              }

              if (network !== NETWORK) {
                await unisat.switchNetwork(
                  NETWORK === NET_TYPE_TEST ? NET_TYPE_TEST : NET_TYPE_LIVE
                );
              }

              const [address] = await unisat.getAccounts();
              const publicKey = await unisat.getPublicKey();

              const ret = validate(address, NETWORK);
              if (!ret) {
                toast.warn('Invalid Address!', ALERT_WARN_CONFIG);
                return;
              }
              const addressInfo = getAddressFormat(address);
              console.log(publicKey, ret, addressInfo);

              if (addressInfo.type === ADDR_TYPE_SH) {
                addressInfo.type = ADDR_TYPE_SH_WPKH;
              }

              setOrdinalsAddress({
                address,
                addressType: addressInfo.type,
                publicKey,
              });
              setPaymentAddress({
                address,
                addressType: addressInfo.type,
                publicKey,
              });
              console.log('asdffasdfd');
              toast.success('Unisat Wallet Connected!', ALERT_SUCCESS_CONFIG);
              setConnected(true);
            } else {
              toast.warn('Fail Unisat Wallet Connect!', ALERT_WARN_CONFIG);
              setConnected(false);
            }
            break;
          case 'Leather':
            if (!LeatherProvider) {
              toast.warn('Install Leather Wallet!', ALERT_WARN_CONFIG);
              return;
            }

            const response = await LeatherProvider.request('getAddresses');
            const ordinalsAddress = response.result.addresses.find(
              (address) => address.type === ADDR_TYPE_TR
            );
            const paymentAddress = response.result.addresses.find(
              (address) => address.type === ADDR_TYPE_WPKH
            );

            if (paymentAddress.type === ADDR_TYPE_SH) {
              paymentAddress.type = ADDR_TYPE_SH_WPKH;
            }
            paymentAddress.addressType = paymentAddress.type;

            if (ordinalsAddress.type === ADDR_TYPE_SH) {
              ordinalsAddress.type = ADDR_TYPE_SH_WPKH;
            }
            ordinalsAddress.addressType = ordinalsAddress.type;

            setOrdinalsAddress(ordinalsAddress);
            setPaymentAddress(paymentAddress);
            toast.success('Leather Wallet Connected!', ALERT_SUCCESS_CONFIG);
            setConnected(true);
            break;
          case 'Alby':
            toast.warn('Alby Wallet Connect Coming Soon!', ALERT_WARN_CONFIG);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [connected, unisat, LeatherProvider, XverseProviders]
  );

  const logout = useCallback(async () => {
    if (!connected) {
      return;
    }
    toast.success(`${wallet} Wallet Disconnected!`, ALERT_SUCCESS_CONFIG);
    setWallet('');
    setConnected(false);
    setSatBalance(0);
    setInscriptions({});
    setPaymentAddress({
      address: '',
      type: '',
      addressType: '',
      publicKey: '',
      derivationPath: '',
      symbol: '',
      purpose: '',
    });
    setOrdinalsAddress({
      address: '',
      type: '',
      addressType: '',
      publicKey: '',
      derivationPath: '',
      symbol: '',
      tweakedPublicKey: '',
      purpose: '',
    });
  }, [connected, wallet]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setRefetch((prevRefetch) => {
        return !prevRefetch;
      });
    }, REFETCH);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    async function fetchAssets() {
      if (ordinalsAddress.address && paymentAddress.address) {
        try {
          // address validation
          let ret = validate(paymentAddress.address, NETWORK);
          if (!ret) {
            toast.warn('Invalid Payment Address!', ALERT_WARN_CONFIG);
            return;
          }
          ret = validate(ordinalsAddress.address, NETWORK);
          if (!ret) {
            toast.warn('Invalid Ordinals Address!', ALERT_WARN_CONFIG);
            return;
          }
          const payAddrInfoByUnisat = await getAddressInfoByUnisat(
            paymentAddress.address
          );
          setSatBalance(payAddrInfoByUnisat.btcSatoshi);
          const btcUtxoByUnisat = await getBtcUtxoByUnisat(
            paymentAddress.address,
            0,
            payAddrInfoByUnisat.btcUtxoCount
          );
          console.log('btcUtxoByUnisat: ', btcUtxoByUnisat);
          setUtxos(btcUtxoByUnisat);

          const inscriptions = await getInscriptions(ordinalsAddress.address);
          console.log('inscriptions: ', inscriptions);
          setInscriptions(inscriptions);
        } catch (error) {
          console.log('fetchAssets: ', error);
        }
      }
    }
    fetchAssets();
  }, [ordinalsAddress.address, paymentAddress.address, refetch]);

  useEffect(() => {
    async function fetchData() {
      const _feeData = await getRecommendFee();
      if (_feeData) {
        setFeeData(_feeData);
      }
    }
    fetchData();
  }, [refetch]);

  const signMessage = useCallback(
    async (message, addressType) => {
      if (
        !message ||
        !addressType ||
        !connected ||
        !paymentAddress.address ||
        !ordinalsAddress.address
      ) {
        toast.warn('Invalid Operation', ALERT_WARN_CONFIG);
        return;
      }
      let signedMessage = '';
      switch (wallet) {
        case 'Unisat':
          try {
            signedMessage = await unisat.signMessage(message);
            toast.success('Unisat Wallet Sign Success!', ALERT_SUCCESS_CONFIG);
          } catch (error) {
            toast.error('Unisat Wallet Sign Fail!', ALERT_ERROR_CONFIG);
          }
          break;
        case 'Xverse':
          const signMessageOptions = {
            payload: {
              network: {
                type: xverseNetwork,
              },
              address:
                addressType === ADDR_FOR_PAYMENTS
                  ? paymentAddress.address
                  : ordinalsAddress.address,
              message,
            },
            onFinish: (response) => {
              signedMessage = response;
              toast.success(
                'Xverse Wallet Sign Success!',
                ALERT_SUCCESS_CONFIG
              );
            },
            onCancel: () => {
              toast.error('Xverse Wallet Sign Fail!', ALERT_ERROR_CONFIG);
            },
          };
          await signMessageXverse(signMessageOptions);
          break;
        case 'Leather':
          try {
            const response = await LeatherProvider.request('signMessage', {
              message,
              paymentType:
                addressType === ADDR_FOR_PAYMENTS
                  ? ADDR_TYPE_WPKH
                  : ADDR_TYPE_TR,
              network: NETWORK,
            });
            signedMessage = response.result.signature;
            toast.success('Leather Wallet Sign Success!', ALERT_SUCCESS_CONFIG);
          } catch (error) {
            toast.error('Leather Wallet Sign Fail!', ALERT_ERROR_CONFIG);
          }
          break;
        case 'Alby':
          toast.warn('Alby Wallet Coming Soon!', ALERT_WARN_CONFIG);
          break;
        default:
          break;
      }
      return { signedMessage };
    },
    [
      connected,
      wallet,
      unisat,
      LeatherProvider,
      paymentAddress.address,
      ordinalsAddress.address,
    ]
  );

  const sendBTC = useCallback(
    async (toAddress, satoshis, feeRate) => {
      if (!connected || !paymentAddress.address) {
        return;
      }

      const allUtxos = await getAddressUtxo(paymentAddress.address);

      const psbt = new Psbt({ network });
      const payableUtxos = utxos.utxo.sort(
        (item1, item2) => item2.satoshi - item1.satoshi
      );

      let idx = 0;
      let curTotal = 0;
      while (satoshis + 500 > curTotal) {
        // TODO gas fee control
        if (isOwnerOfUtxo(allUtxos, payableUtxos[idx])) {
          const input = await getPsbtInput(
            paymentAddress,
            payableUtxos[idx],
            payableUtxos[idx].satoshi
          );
          psbt.addInput(input);
          curTotal += payableUtxos[idx].satoshi;
        }
        idx++;
      }

      psbt.addOutput({
        address: toAddress,
        value: satoshis,
      });
      psbt.addOutput({
        address: paymentAddress.address,
        value: curTotal - satoshis - 500, // TODO gas fee control
      });
      const tx = psbt.toHex();

      let txid = '';
      switch (wallet) {
        case 'Unisat':
          try {
            const signedPsbt = await unisat.signPsbt(tx);
            txid = await unisat.pushPsbt(signedPsbt);
            if (txid) {
              console.log('SendBTC txHash!', txid);
              toast.success(
                getLinkComponent(
                  'Paid Successfully!',
                  `${MEMPOOL_URL}/tx/${txid}`
                ),
                ALERT_SUCCESS_CONFIG
              );
            } else {
              toast.error('Fail SendBTC!', ALERT_ERROR_CONFIG);
            }
          } catch (error) {
            console.log('Fail Pay: ', error);
            toast.error('Fail Pay!', ALERT_ERROR_CONFIG);
          }
          break;
        case 'Xverse':
          const signPsbtOptions = {
            payload: {
              message: 'pay to inscribe',
              network: {
                type: BitcoinNetworkType.Testnet,
              },
              psbtBase64: psbt.toBase64(),
              broadcast: true,
              inputsToSign: [
                {
                  address: paymentAddress.address,
                  signingIndexes: [0],
                },
              ],
            },
            onFinish: async (response) => {
              txid = response.txId;
              if (txid) {
                console.log('SendBTC txHash!', txid);
                toast.success(
                  getLinkComponent(
                    'Paid Successfully!',
                    `${MEMPOOL_URL}/tx/${txid}`
                  ),
                  ALERT_SUCCESS_CONFIG
                );
              } else {
                toast.error('Fail SendBTC!', ALERT_ERROR_CONFIG);
              }
            },
            onCancel: () => {
              toast.error('Fail Pay!', ALERT_ERROR_CONFIG);
            },
          };

          try {
            await signTransaction(signPsbtOptions);
          } catch (error) {
            console.log('Fail Pay err: ', error);
          }
          break;
        case 'Leather':
          try {
            const requestParams = {
              hex: tx,
              network: NETWORK,
              broadcast: false,
            };

            const signedPsbt = await LeatherProvider.request(
              'signPsbt',
              requestParams
            );
            const txHex = Psbt.fromHex(signedPsbt.result.hex, { network })
              .finalizeAllInputs()
              .extractTransaction()
              .toHex();
            txid = await postTx(txHex);
            if (txid) {
              console.log('SendBTC txHash!', txid);
              toast.success(
                getLinkComponent(
                  'Paid Successfully!',
                  `${MEMPOOL_URL}/tx/${txid}`
                ),
                ALERT_SUCCESS_CONFIG
              );
            } else {
              toast.error('Fail SendBTC!', ALERT_ERROR_CONFIG);
            }
          } catch (error) {
            console.log('Fail Pay err: ', error);
            toast.error('Fail Pay!', ALERT_ERROR_CONFIG);
          }
          break;
        case 'Alby':
          toast.warn('Alby Wallet Connect Coming Soon!', ALERT_WARN_CONFIG);
          break;
        default:
          break;
      }
      return txid;
    },
    [wallet, connected, paymentAddress, unisat, LeatherProvider, utxos]
  );

  const splitUtxoTx = useCallback(async () => {
    if (!connected || !paymentAddress.address) {
      return;
    }

    const allUtxos = await getAddressUtxo(paymentAddress.address);

    const psbt = new Psbt({ network });

    const payableUtxo = utxos.utxo.find(
      (utxo) => utxo.satoshi > 20000 && isOwnerOfUtxo(allUtxos, utxo)
    );

    const input = await getPsbtInput(
      paymentAddress,
      payableUtxo,
      payableUtxo.satoshi
    );

    psbt.addInput(input);

    for (let idx = 0; idx < SPLIT_CNT; idx++) {
      psbt.addOutput({
        address: paymentAddress.address,
        value: SPLIT_SIZE,
      });
    }
    psbt.addOutput({
      address: paymentAddress.address,
      value: payableUtxo.satoshi - SPLIT_SIZE * SPLIT_CNT - FEE_SATS, // TODO gas fee control
    });
    const tx = psbt.toHex();

    let txid = '';
    switch (wallet) {
      case 'Unisat':
        try {
          const signedPsbt = await unisat.signPsbt(tx);
          txid = await unisat.pushPsbt(signedPsbt);
          if (txid) {
            console.log('SplitUtxo txHash!', txid);
            toast.success(
              getLinkComponent(
                'Paid Successfully!',
                `${MEMPOOL_URL}/tx/${txid}`
              ),
              ALERT_SUCCESS_CONFIG
            );
          } else {
            toast.error('Fail SplitUtxo!', ALERT_ERROR_CONFIG);
          }
        } catch (error) {
          console.log('Fail splitUtxoTx: ', error);
          toast.error('Fail SplitUtxo!', ALERT_ERROR_CONFIG);
        }
        break;
      case 'Xverse':
        const signPsbtOptions = {
          payload: {
            message: 'splitUtxoTx',
            network: {
              type: BitcoinNetworkType.Testnet,
            },
            psbtBase64: psbt.toBase64(),
            broadcast: true,
            inputsToSign: [
              {
                address: paymentAddress.address,
                signingIndexes: [0],
              },
            ],
          },
          onFinish: (response) => {
            txid = response.txId;
            if (txid) {
              console.log('SplitUtxo txHash!', txid);
              toast.success(
                getLinkComponent(
                  'Paid Successfully!',
                  `${MEMPOOL_URL}/tx/${txid}`
                ),
                ALERT_SUCCESS_CONFIG
              );
            } else {
              toast.error('Fail SplitUtxo!', ALERT_ERROR_CONFIG);
            }
          },
          onCancel: () => {
            toast.error('Fail SplitUtxo!', ALERT_ERROR_CONFIG);
          },
        };

        try {
          await signTransaction(signPsbtOptions);
        } catch (error) {
          console.log('splitUtxoTx err: ', error);
        }
        break;
      case 'Leather':
        try {
          const requestParams = {
            hex: tx,
            network: NETWORK,
            broadcast: false,
          };

          const signedPsbt = await LeatherProvider.request(
            'signPsbt',
            requestParams
          );
          const txHex = Psbt.fromHex(signedPsbt.result.hex, { network })
            .finalizeAllInputs()
            .extractTransaction()
            .toHex();
          txid = await postTx(txHex);
          if (txid) {
            console.log('SplitUtxo txHash!', txid);
            toast.success(
              getLinkComponent(
                'Paid Successfully!',
                `${MEMPOOL_URL}/tx/${txid}`
              ),
              ALERT_SUCCESS_CONFIG
            );
          } else {
            toast.error('Fail SplitUtxo!', ALERT_ERROR_CONFIG);
          }
        } catch (error) {
          console.log('splitUtxoTx err: ', error);
          toast.error('Fail Leather Wallet SplitUtxo!', ALERT_ERROR_CONFIG);
        }
        break;
      case 'Alby':
        toast.warn('Alby Wallet Connect Coming Soon!', ALERT_WARN_CONFIG);
        break;
      default:
        break;
    }
    return txid;
  }, [wallet, connected, paymentAddress, unisat, LeatherProvider, utxos]);

  const listInscription = useCallback(
    async (inscriptionData, price) => {
      try {
        if (ordinalsAddress.addressType === ADDR_TYPE_PKH) {
          toast.error(
            'P2PKH address is not able to list the inscription',
            ALERT_ERROR_CONFIG
          );
          return;
        }

        if (
          !inscriptionData ||
          !inscriptionData.address ||
          !price ||
          price <= 0 ||
          !connected ||
          !paymentAddress.address ||
          !ordinalsAddress.address
        ) {
          toast.error('Invalid Operation', ALERT_ERROR_CONFIG);
          return;
        }

        if (inscriptionData.address !== ordinalsAddress.address) {
          toast.error('Invalid Owner', ALERT_ERROR_CONFIG);
          return;
        }

        if (!inscriptionData.utxo) {
          toast.error('Invalid Utxo', ALERT_ERROR_CONFIG);
          return;
        }

        const allUtxos = await getAddressUtxo(ordinalsAddress.address);
        if (!isOwnerOfUtxo(allUtxos, inscriptionData.utxo)) {
          toast.error('Invalid Owner', ALERT_ERROR_CONFIG);
          return;
        }

        const psbt = new Psbt({ network });

        const sellerInput = await getPsbtInput(
          ordinalsAddress,
          inscriptionData.utxo,
          inscriptionData.utxo.satoshi
        );
        const sellIn = JSON.stringify({
          ordinalsAddress: ordinalsAddress,
          utxo: inscriptionData.utxo,
        });

        const sellerOutput = {
          address: paymentAddress.address,
          value: inscriptionData.utxo.satoshi + price,
        };

        psbt.addInput({
          ...sellerInput,
          sighashType:
            Transaction.SIGHASH_SINGLE | Transaction.SIGHASH_ANYONECANPAY,
        });
        psbt.addOutput(sellerOutput);
        console.log('list psbt before: ', psbt);
        const tx = psbt.toHex();

        switch (wallet) {
          case 'Unisat':
            try {
              const signedPsbt = await unisat.signPsbt(tx);
              await listItem(
                inscriptionData.inscriptionId,
                price,
                sellIn,
                JSON.stringify(sellerOutput),
                signedPsbt
              );
            } catch (error) {
              console.log('Fail List!', error);
              toast.error('Fail List!', ALERT_ERROR_CONFIG);
            }
            break;
          case 'Xverse':
            const signPsbtOptions = {
              payload: {
                message: '',
                network: {
                  type: xverseNetwork,
                },
                psbtBase64: psbt.toBase64(),
                inputsToSign: [
                  {
                    address: ordinalsAddress.address,
                    signingIndexes: [0],
                    sigHash:
                      Transaction.SIGHASH_SINGLE |
                      Transaction.SIGHASH_ANYONECANPAY,
                  },
                ],
              },
              onFinish: async (response) => {
                try {
                  await listItem(
                    inscriptionData.inscriptionId,
                    price,
                    sellIn,
                    JSON.stringify(sellerOutput),
                    Psbt.fromBase64(response.psbtBase64, { network })
                      .finalizeAllInputs()
                      .toHex()
                  );
                } catch (error) {
                  console.log('Xverse', error);
                  toast.error('Fail List!', ALERT_ERROR_CONFIG);
                }
              },
              onCancel: () => {
                toast.error('Fail List!', ALERT_ERROR_CONFIG);
              },
            };

            try {
              await signTransaction(signPsbtOptions);
            } catch (error) {
              console.log('listInscription err: ', error);
            }
            break;
          case 'Leather':
            try {
              const requestParams = {
                hex: tx,
                network: NETWORK,
              };

              const response = await LeatherProvider.request(
                'signPsbt',
                requestParams
              );
              await listItem(
                inscriptionData.inscriptionId,
                price,
                sellIn,
                JSON.stringify(sellerOutput),
                Psbt.fromHex(response.result.hex, { network })
                  .finalizeAllInputs()
                  .toHex()
              );
            } catch (error) {
              console.log('Fail List!', error);
              toast.error('Fail List!', ALERT_ERROR_CONFIG);
            }
            break;
          case 'Alby':
            toast.warn('Alby Wallet Connect Coming Soon!', ALERT_WARN_CONFIG);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log('listInscription error:', error);
      }
    },
    [
      connected,
      ordinalsAddress,
      paymentAddress.address,
      unisat,
      LeatherProvider,
      wallet,
    ]
  );

  const delistInscription = useCallback(
    async (inscriptionData, price) => {
      try {
        if (
          !inscriptionData ||
          !inscriptionData.address ||
          !price ||
          price <= 0 ||
          !connected ||
          !paymentAddress.address ||
          !ordinalsAddress.address
        ) {
          toast.error('Invalid Operation', ALERT_ERROR_CONFIG);
          return;
        }

        if (inscriptionData.address !== ordinalsAddress.address) {
          toast.error('Invalid Owner', ALERT_ERROR_CONFIG);
          return;
        }

        if (!inscriptionData.utxo) {
          toast.error('Invalid Utxo', ALERT_ERROR_CONFIG);
          return;
        }

        const allUtxos = await getAddressUtxo(ordinalsAddress.address);
        if (!isOwnerOfUtxo(allUtxos, inscriptionData.utxo)) {
          toast.error('Invalid Owner', ALERT_ERROR_CONFIG);
          return;
        }

        const psbt = new Psbt({ network });

        const sellerInput = await getPsbtInput(
          ordinalsAddress,
          inscriptionData.utxo,
          inscriptionData.utxo.satoshi
        );

        const sellerOutput = {
          address: paymentAddress.address,
          value: inscriptionData.utxo.satoshi + price,
        };

        psbt.addInput({
          ...sellerInput,
          sighashType:
            Transaction.SIGHASH_SINGLE | Transaction.SIGHASH_ANYONECANPAY,
        });
        psbt.addOutput(sellerOutput);
        const tx = psbt.toHex();

        switch (wallet) {
          case 'Unisat':
            try {
              const signedPsbt = await unisat.signPsbt(tx);
              await delistItem(
                inscriptionData.inscriptionId,
                price,
                JSON.stringify(sellerInput),
                JSON.stringify(sellerOutput),
                signedPsbt
              );
            } catch (error) {
              console.log('Unisat', error);
              toast.error('Fail Delist!', ALERT_ERROR_CONFIG);
            }
            break;
          case 'Xverse':
            const signPsbtOptions = {
              payload: {
                message: '',
                network: {
                  type: xverseNetwork,
                },
                psbtBase64: psbt.toBase64(),
                inputsToSign: [
                  {
                    address: ordinalsAddress.address,
                    signingIndexes: [0],
                    sigHash:
                      Transaction.SIGHASH_SINGLE |
                      Transaction.SIGHASH_ANYONECANPAY,
                  },
                ],
              },
              onFinish: async (response) => {
                try {
                  await delistItem(
                    inscriptionData.inscriptionId,
                    price,
                    JSON.stringify(sellerInput),
                    JSON.stringify(sellerOutput),
                    Psbt.fromBase64(response.psbtBase64, { network }).toHex()
                  );
                } catch (error) {
                  console.log('Xverse', error);
                  toast.error('Fail Delist!', ALERT_ERROR_CONFIG);
                }
              },
              onCancel: () => {
                toast.error('Fail Delist!', ALERT_ERROR_CONFIG);
              },
            };

            try {
              await signTransaction(signPsbtOptions);
            } catch (error) {
              console.log('delistInscription err: ', error);
            }
            break;
          case 'Leather':
            try {
              const requestParams = {
                hex: tx,
                network: NETWORK,
              };

              const response = await LeatherProvider.request(
                'signPsbt',
                requestParams
              );
              await delistItem(
                inscriptionData.inscriptionId,
                price,
                JSON.stringify(sellerInput),
                JSON.stringify(sellerOutput),
                response.result.hex
              );
            } catch (error) {
              console.log('Fail Delist!', error);
              toast.error('Fail Delist!', ALERT_ERROR_CONFIG);
            }
            break;
          case 'Alby':
            toast.warn('Alby Wallet Connect Coming Soon!', ALERT_WARN_CONFIG);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log('delistInscription error:', error);
      }
    },
    [
      connected,
      ordinalsAddress,
      paymentAddress.address,
      unisat,
      LeatherProvider,
      wallet,
    ]
  );

  const buyInscription = useCallback(
    async (inscriptionId, feeRate) => {
      try {
        if (
          !connected ||
          !paymentAddress.address ||
          !ordinalsAddress.address ||
          !inscriptionId
        ) {
          toast.error('Invalid Operation', ALERT_ERROR_CONFIG);
          return;
        }

        if (!utxos || !utxos.utxo || utxos.utxo.length <= 1) {
          toast.error('Insufficient Utxo', ALERT_ERROR_CONFIG);
          return;
        }

        const list = await getList({ inscriptionIds: [inscriptionId] });
        if (!list || list.length <= 0) {
          toast.error('Invalid Inscription', ALERT_ERROR_CONFIG);
          return;
        }
        const sellData = list[0];

        const dummyUtxos = utxos.utxo.filter(
          (utxo) => utxo.satoshi === SPLIT_SIZE
        );
        const payableUtxos = utxos.utxo
          .filter((utxo) => utxo.satoshi > SPLIT_SIZE)
          .sort((item1, item2) => item2.satoshi - item1.satoshi);
        // console.log("dummyUtxos: ", dummyUtxos)
        // console.log("payableUtxos: ", payableUtxos)
        // console.log("satBalance: ", satBalance)

        if (dummyUtxos.length < 2) {
          toast.warn('You should split utxo to buy Inscription!');
          await splitUtxoTx();
          return;
        }

        if (satBalance < sellData.price + MIN_WALLET_SATS) {
          toast.error('Insufficient BTC', ALERT_ERROR_CONFIG);
          return;
        }

        const psbt = new Psbt({ network });

        let allUtxos = await getAddressUtxo(paymentAddress.address);
        for (let idx = 0; idx < 2; idx++) {
          if (isOwnerOfUtxo(allUtxos, dummyUtxos[idx])) {
            const input = await getPsbtInput(
              paymentAddress,
              dummyUtxos[idx],
              dummyUtxos[idx].satoshi
            );
            psbt.addInput(input);
          }
        }

        // add dumpy output
        psbt.addOutput({
          address: paymentAddress.address,
          value: 1200,
        });

        // add oridinal
        psbt.addOutput({
          address: ordinalsAddress.address,
          value: sellData.satoshi,
        });

        // sellerInput
        const sellIn = JSON.parse(sellData.sellIn);
        const sellerInput = await getPsbtInput(
          sellIn.ordinalsAddress,
          sellIn.utxo,
          sellIn.utxo.satoshi
        );
        const sellerUtxos = await getAddressUtxo(
          sellIn.ordinalsAddress.address
        );
        if (!isOwnerOfUtxo(sellerUtxos, sellIn.utxo)) {
          toast.error('Invalid Seller Inscription', ALERT_ERROR_CONFIG);
          return;
        }
        psbt.addInput(sellerInput);
        // sellerOutput
        psbt.addOutput(JSON.parse(sellData.sellOut));

        allUtxos = await getAddressUtxo(paymentAddress.address);

        let idx2 = 0;
        let totalPaySat = 0;
        while (
          (idx2 + 1) * 200 * feeData.fastestFee +
            sellData.price +
            FEE_SATS +
            sellData.satoshi >
          totalPaySat
        ) {
          // TODO gas fee control
          if (isOwnerOfUtxo(allUtxos, payableUtxos[idx2])) {
            const input = await getPsbtInput(
              paymentAddress,
              payableUtxos[idx2],
              payableUtxos[idx2].satoshi
            );
            psbt.addInput(input);
            totalPaySat += payableUtxos[idx2].satoshi;
          }
          idx2++;
        }

        // add dumpy output
        psbt.addOutput({
          address: paymentAddress.address,
          value: SPLIT_SIZE,
        });

        // add dumpy output
        psbt.addOutput({
          address: paymentAddress.address,
          value: SPLIT_SIZE,
        });

        // add rest output
        psbt.addOutput({
          address: paymentAddress.address,
          value:
            totalPaySat -
            sellData.price -
            sellData.satoshi -
            FEE_SATS -
            idx2 * 200 * feeData.fastestFee, // TODO gas fee control
        });

        const sellerSignedPsbt = Psbt.fromHex(sellData.psbt, { network });
        const tx = psbt.toHex();

        switch (wallet) {
          case 'Unisat':
            try {
              const signedPsbt = await unisat.signPsbt(tx);
              const buyerSignedPsbt = Psbt.fromHex(signedPsbt, { network });
              const txid = await mergeBuySellPsbtAndBroadcast(
                buyerSignedPsbt,
                sellerSignedPsbt
              );
              if (txid) {
                console.log('Bought txHash!', txid);
                toast.success(
                  getLinkComponent(
                    'Successfully Bought!',
                    `${MEMPOOL_URL}/tx/${txid}`
                  ),
                  ALERT_SUCCESS_CONFIG
                );
                await delistItemById(inscriptionId);
              } else {
                toast.error('Fail Buy!', ALERT_ERROR_CONFIG);
              }
            } catch (error) {
              console.log('Fail Buy!', error);
              toast.error('Fail Buy!', ALERT_ERROR_CONFIG);
            }
            break;
          case 'Xverse':
            const signPsbtOptions = {
              payload: {
                message: '',
                network: {
                  type: xverseNetwork,
                },
                psbtBase64: psbt.toBase64(),
                broadcast: false,
                inputsToSign: [
                  {
                    address: paymentAddress.address,
                    signingIndexes: [0],
                  },
                  {
                    address: paymentAddress.address,
                    signingIndexes: [1],
                  },
                  {
                    address: paymentAddress.address,
                    signingIndexes: [3],
                  },
                ],
              },
              onFinish: async (response) => {
                try {
                  const buyerSignedPsbt = Psbt.fromBase64(response.psbtBase64, {
                    network,
                  });
                  buyerSignedPsbt.finalizeInput(0);
                  buyerSignedPsbt.finalizeInput(1);
                  buyerSignedPsbt.finalizeInput(3);
                  const txid = await mergeBuySellPsbtAndBroadcast(
                    buyerSignedPsbt,
                    sellerSignedPsbt
                  );
                  if (txid) {
                    console.log('txid', txid);
                    toast.success(
                      getLinkComponent(
                        'Successfully Bought!',
                        `${MEMPOOL_URL}/tx/${txid}`
                      ),
                      ALERT_SUCCESS_CONFIG
                    );
                    await delistItemById(inscriptionId);
                  } else {
                    toast.error('Fail Buy!', ALERT_ERROR_CONFIG);
                  }
                } catch (error) {
                  console.log('Xverse', error);
                  toast.error('Fail Buy!', ALERT_ERROR_CONFIG);
                }
              },
              onCancel: () => {
                toast.error('Fail Bought!', ALERT_ERROR_CONFIG);
              },
            };

            try {
              await signTransaction(signPsbtOptions);
            } catch (error) {
              console.log('splitUtxoTx err: ', error);
            }
            break;
          case 'Leather':
            try {
              const requestParams = {
                hex: tx,
                network: NETWORK,
                broadcast: false,
                signAtIndex: [0, 1, 3],
              };

              const signedPsbt = await LeatherProvider.request(
                'signPsbt',
                requestParams
              );
              const buyerSignedPsbt = Psbt.fromHex(signedPsbt.result.hex, {
                network,
              });
              buyerSignedPsbt.finalizeInput(0);
              buyerSignedPsbt.finalizeInput(1);
              buyerSignedPsbt.finalizeInput(3);
              const txid = await mergeBuySellPsbtAndBroadcast(
                buyerSignedPsbt,
                sellerSignedPsbt
              );
              if (txid) {
                console.log('txid', txid);
                toast.success(
                  getLinkComponent(
                    'Successfully Bought!',
                    `${MEMPOOL_URL}/tx/${txid}`
                  ),
                  ALERT_SUCCESS_CONFIG
                );
                await delistItemById(inscriptionId);
              } else {
                toast.error('Fail Buy!', ALERT_ERROR_CONFIG);
              }
            } catch (error) {
              console.log('Fail Buy!', error);
              toast.error('Fail Buy!', ALERT_ERROR_CONFIG);
            }
            break;
          case 'Alby':
            toast.warn('Alby Wallet Connect Coming Soon!', ALERT_WARN_CONFIG);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log('BuyInscription error:', error);
      }
    },
    [
      connected,
      paymentAddress,
      ordinalsAddress.address,
      unisat,
      LeatherProvider,
      wallet,
      feeData.fastestFee,
      satBalance,
      utxos,
      splitUtxoTx,
    ]
  );

  return {
    feeData,
    connected,
    wallet,
    setWallet,
    paymentAddress,
    setPaymentAddress,
    ordinalsAddress,
    setOrdinalsAddress,
    satBalance,
    inscriptions,
    login,
    logout,
    signMessage,
    sendBTC,
    splitUtxoTx,
    listInscription,
    buyInscription,
    delistInscription,
  };
}
