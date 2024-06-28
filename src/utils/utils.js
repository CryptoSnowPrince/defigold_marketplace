import axios from 'axios';
import {
  ADDR_TYPE_PKH,
  ADDR_TYPE_SH,
  ADDR_TYPE_SH_WPKH,
  ADDR_TYPE_SH_WSH,
  ADDR_TYPE_TR,
  ADDR_TYPE_WPKH,
  ADDR_TYPE_WSH,
  ALERT_ERROR_CONFIG,
  ALERT_SUCCESS_CONFIG,
  API_PATH,
  NETWORK,
  NET_TYPE_MAIN,
  TX_NON_RBF_SEQ,
  UNISAT_API,
  UNISAT_API_KEY_0,
  UNISAT_API_KEY_1,
  UNISAT_API_KEY_2,
  UNISAT_API_KEY_3,
  UNISAT_API_KEY_4,
} from './constants';
import { toast } from 'react-toastify';

import * as ecc from '@bitcoinerlab/secp256k1';
window.Buffer = Buffer; // Make Buffer available globally
const bitcoin = require('bitcoinjs-lib');
bitcoin.initEccLib(ecc);

export const getDisplayString = (str, subLength1, subLength2) => {
  return `${str.toString().substr(0, subLength1)}...${str
    .toString()
    .substr(str.length - subLength2, str.length)}`;
};

export const timeEstimate = (feeRate, feeData) => {
  const feeRateValue = parseFloat(feeRate);
  try {
    if (feeRateValue < feeData?.minimumFee) {
      return '>1 hour';
    } else if (feeRateValue < feeData?.hourFee) {
      return '~1 hour';
    } else if (feeRateValue < feeData?.halfHourFee) {
      return '~half hour';
    } else if (feeRateValue >= feeData?.fastestFee) {
      return '~15 minutes';
    }
    return "Can't Estimate";
  } catch (error) {
    return "Can't Estimate";
  }
};

export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const isValidAddress = async (address) => {
  if (address) {
    try {
      const response = await axios.post(`${API_PATH}/utils/getIsValidAddress`, {
        address,
      });
      return response.data.result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
};

export const getAddressInfo = async (address) => {
  if (address) {
    try {
      const response = await axios.post(`${API_PATH}/utils/getAddressInfo`, {
        address,
      });
      return response.data.result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

export const getAddressUtxo = async (address) => {
  if (address) {
    try {
      const response = await axios.post(`${API_PATH}/utils/getAddressUtxo`, {
        address,
      });
      return response.data.result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

export const getRecommendFee = async () => {
  try {
    const response = await axios.post(`${API_PATH}/utils/getRecommendFee`);
    return response.data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTxHex = async (txid) => {
  try {
    const response = await axios.post(`${API_PATH}/utils/getTxHex`, {
      txid,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAddressInfoByUnisat = async (address) => {
  if (address) {
    try {
      const options = {
        method: 'GET',
        url: `${UNISAT_API}/v1/indexer/address/${address}/balance`,
        headers: {
          Authorization: `Bearer ${UNISAT_API_KEY_1}`,
        },
      };

      const response = await axios.request(options);
      if (response.data.msg === 'ok') {
        return response.data.data;
      }
      return false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

export const getBtcUtxoByUnisat = async (address, cursor, size) => {
  if (address && typeof cursor === 'number' && typeof size === 'number') {
    try {
      const options = {
        method: 'GET',
        url: `${UNISAT_API}/v1/indexer/address/${address}/utxo-data?cursor=${cursor}&size=${size}`,
        headers: {
          Authorization: `Bearer ${UNISAT_API_KEY_2}`,
        },
      };

      const response = await axios.request(options);
      if (response.data.code === 0) {
        return response.data.data;
      }
      return false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

export const getOrdinalUtxoByUnisat = async (address, cursor, size) => {
  if (address && typeof cursor === 'number' && typeof size === 'number') {
    try {
      const options = {
        method: 'GET',
        url: `${UNISAT_API}/v1/indexer/address/${address}/inscription-utxo-data?cursor=${cursor}&size=${size}`,
        headers: {
          Authorization: `Bearer ${UNISAT_API_KEY_3}`,
        },
      };

      const response = await axios.request(options);
      if (response.data.code === 0) {
        return response.data.data;
      }
      return false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

export const getInscriptionsByUnisat = async (address, cursor, size) => {
  if (address && typeof cursor === 'number' && typeof size === 'number') {
    try {
      const options = {
        method: 'GET',
        url: `${UNISAT_API}/v1/indexer/address/${address}/inscription-data?cursor=${cursor}&size=${size}`,
        headers: {
          Authorization: `Bearer ${UNISAT_API_KEY_4}`,
        },
      };

      const response = await axios.request(options);
      if (response.data.code === 0) {
        return response.data.data;
      }
      return false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

export const getInscriptions = async (address) => {
  try {
    const ordAddrInfoByUnisat = await getAddressInfoByUnisat(address);
    const insByUnisat = await getInscriptionsByUnisat(
      address,
      0,
      ordAddrInfoByUnisat.inscriptionUtxoCount
    );
    const ordUtxo = await getAddressUtxo(address);
    const pendingUtxo = ordUtxo.filter((utxo) => !utxo.status.confirmed);
    if (pendingUtxo.length > 0 && insByUnisat.inscription.length > 0) {
      const ordConfirmedIns = insByUnisat.inscription.filter((ins) => {
        const item = pendingUtxo.find((utxo) => utxo.txid === ins.utxo.txid);
        if (item) {
          return false;
        }
        return true;
      });

      return {
        total: ordConfirmedIns.length,
        inscription: ordConfirmedIns,
      };
    } else {
      return {
        total: insByUnisat.inscription.length,
        inscription: insByUnisat.inscription,
      };
    }
  } catch (error) {
    return null;
  }
};

export const getInscriptionInfo = async (inscriptionId) => {
  if (inscriptionId) {
    try {
      const options = {
        method: 'GET',
        url: `${UNISAT_API}/v1/indexer/inscription/info/${inscriptionId}`,
        headers: {
          Authorization: `Bearer ${UNISAT_API_KEY_0}`,
        },
      };

      const response = await axios.request(options);
      if (response.data.code === 0) {
        return response.data.data;
      }
      return false;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};

export const copyToClipBoard = async (copyString) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(copyString)
      .then(() => {
        toast.success('Copied!', ALERT_SUCCESS_CONFIG);
      })
      .catch(() => {
        toast.error('Copy Error!', ALERT_ERROR_CONFIG);
      });
  }
};

export const getPayments = (address) => {
  try {
    if (!address) {
      return null;
    }
    let payment;
    switch (address.addressType) {
      case ADDR_TYPE_PKH:
        payment = bitcoin.payments.p2pkh({
          address: address.address,
          pubkey: Buffer.from(address.publicKey, 'hex'),
          network:
            NETWORK === NET_TYPE_MAIN
              ? bitcoin.networks.bitcoin
              : bitcoin.networks.testnet,
        });
        break;
      case ADDR_TYPE_SH:
      case ADDR_TYPE_SH_WPKH:
        payment = bitcoin.payments.p2sh({
          address: address.address,
          redeem: bitcoin.payments.p2wpkh({
            pubkey: Buffer.from(address.publicKey, 'hex'),
            network:
              NETWORK === NET_TYPE_MAIN
                ? bitcoin.networks.bitcoin
                : bitcoin.networks.testnet,
          }),
          network:
            NETWORK === NET_TYPE_MAIN
              ? bitcoin.networks.bitcoin
              : bitcoin.networks.testnet,
        });
        break;
      case ADDR_TYPE_WPKH:
        payment = bitcoin.payments.p2wpkh({
          address: address.address,
          pubkey: Buffer.from(address.publicKey, 'hex'),
          network:
            NETWORK === NET_TYPE_MAIN
              ? bitcoin.networks.bitcoin
              : bitcoin.networks.testnet,
        });
        break;
      case ADDR_TYPE_TR:
        const schnorrPublicKey = address?.tweakedPublicKey
          ? address.tweakedPublicKey
          : address.publicKey.length === 64
          ? address.publicKey
          : address.publicKey.substring(2);
        payment = bitcoin.payments.p2tr({
          address: address.address,
          internalPubkey: Buffer.from(schnorrPublicKey, 'hex'),
          network:
            NETWORK === NET_TYPE_MAIN
              ? bitcoin.networks.bitcoin
              : bitcoin.networks.testnet,
        });
        break;
      case ADDR_TYPE_WSH:
        payment = bitcoin.payments.p2wsh({
          address: address.address,
          redeem: {
            output: Buffer.from('your_witness_script_hex', 'hex'), // TODO
            network:
              NETWORK === NET_TYPE_MAIN
                ? bitcoin.networks.bitcoin
                : bitcoin.etworks.testnet,
          },
          network:
            NETWORK === NET_TYPE_MAIN
              ? bitcoin.networks.bitcoin
              : bitcoin.networks.testnet,
        });
        break;
      case ADDR_TYPE_SH_WSH:
        const witnessScriptHex = 'your_witness_script_hex'; // TODO
        const witnessScript = Buffer.from(witnessScriptHex, 'hex');
        payment = bitcoin.payments.p2wsh({
          redeem: { output: witnessScript },
          network:
            NETWORK === NET_TYPE_MAIN
              ? bitcoin.networks.bitcoin
              : bitcoin.networks.testnet,
        });
        break;
      default:
        break;
    }
    console.log('payments: ', payment);
    return payment;
  } catch (error) {
    console.log('getPayments err: ', error);
    return null;
  }
};

export const getPsbtInput = async (address, utxo, value) => {
  try {
    if (!address || !utxo || !value || value <= 0) {
      return null;
    }
    const payment = getPayments(address);
    const scriptPubKey = bitcoin.address.toOutputScript(
      address.address,
      NETWORK === NET_TYPE_MAIN
        ? bitcoin.networks.bitcoin
        : bitcoin.networks.testnet
    );
    const txHex = await getTxHex(utxo.txid);
    if (!txHex) {
      return null;
    }
    const nonWitnessUtxo = Buffer.from(txHex, 'hex');
    let input = {
      hash: utxo.txid,
      index: utxo.vout,
      sequence: TX_NON_RBF_SEQ, // The default is non-RBF . This line is not needed.
    };

    switch (address.addressType) {
      case ADDR_TYPE_PKH:
        input = {
          ...input,
          nonWitnessUtxo,
        };
        break;
      case ADDR_TYPE_WPKH:
        input = {
          ...input,
          witnessUtxo: {
            script: scriptPubKey,
            value,
          },
        };
        break;
      case ADDR_TYPE_SH:
        input = {
          ...input,
          nonWitnessUtxo,
          redeemScript: Buffer.from('redeemScriptHex', 'hex'), // TODO
        };
        break;
      case ADDR_TYPE_WSH:
        input = {
          ...input,
          witnessUtxo: {
            script: scriptPubKey,
            value,
          },
          witnessScript: Buffer.from('witnessScriptHex', 'hex'), // TODO The original script hashed to create the P2WSH address
        };
        break;
      case ADDR_TYPE_TR:
        input = {
          ...input,
          witnessUtxo: {
            script: scriptPubKey,
            value,
          },
          tapInternalKey: payment.internalPubkey,
        };
        break;
      case ADDR_TYPE_SH_WPKH:
        input = {
          ...input,
          witnessUtxo: {
            script: payment.output,
            value,
          },
          redeemScript: payment.redeem.output,
        };
        break;
      case ADDR_TYPE_SH_WSH:
        const witnessScriptHex = 'your_witness_script_hex'; // TODO
        const witnessScript = Buffer.from(witnessScriptHex, 'hex');
        input = {
          ...input,
          witnessUtxo: {
            script: payment.output,
            value,
          },
          redeemScript: payment.output,
          witnessScript: witnessScript,
        };
        break;
      default:
        break;
    }
    console.log('input: ', input);
    return input;
  } catch (error) {
    console.log('getPsbtInput err: ', error);
    return null;
  }
};

export const postTx = async (data) => {
  try {
    const response = await axios.post(`${API_PATH}/utils/postTx`, {
      data,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const mergeBuySellPsbtAndBroadcast = async (
  buyerSignedPsbt,
  sellerSignedPsbt,
  sellerInput
) => {
  // console.log('buyerSignedPsbt0: ', buyerSignedPsbt)
  // console.log('mergeBuySellPsbtAndBroadcast buyerSignedPsbt toBase64: ', buyerSignedPsbt.toBase64())
  // console.log('mergeBuySellPsbtAndBroadcast sellerSignedPsbt toBase64: ', sellerSignedPsbt.toBase64())
  buyerSignedPsbt.data.globalMap.unsignedTx.tx.ins[2] =
    sellerSignedPsbt.data.globalMap.unsignedTx.tx.ins[0];
  buyerSignedPsbt.data.inputs[2] = sellerSignedPsbt.data.inputs[0];
  // console.log('sellerSignedPsbt: ', sellerSignedPsbt)
  // console.log('buyerSignedPsbt: ', buyerSignedPsbt)
  const txHex = buyerSignedPsbt.extractTransaction().toHex();
  // console.log('mergeBuySellPsbtAndBroadcast toBase64: ', buyerSignedPsbt.toBase64())
  // console.log('mergeBuySellPsbtAndBroadcast toHex: ', buyerSignedPsbt.toHex())
  // console.log('mergeBuySellPsbtAndBroadcast: ', txHex)
  const txid = await postTx(txHex);
  return txid;
};

export const listItem = async (inscriptionId, price, sellIn, sellOut, psbt) => {
  const res = await axios.post(`${API_PATH}/users/listitem`, {
    inscriptionId,
    price,
    sellIn,
    sellOut,
    psbt,
  });

  if (res.data.result) {
    toast.success('Successfully Listed!', ALERT_SUCCESS_CONFIG);
  } else {
    toast.error('Fail List!', ALERT_ERROR_CONFIG);
  }
};

export const delistItemById = async (inscriptionId) => {
  const res = await axios.post(`${API_PATH}/users/delistitem`, {
    inscriptionId,
  });

  return res.data.result;
};

export const delistItem = async (
  inscriptionId,
  price,
  sellIn,
  sellOut,
  psbt
) => {
  const res = await axios.post(`${API_PATH}/users/delistitem`, {
    inscriptionId,
    price,
    sellIn,
    sellOut,
    psbt,
  });

  if (res.data.result) {
    toast.success('Successfully Delisted!', ALERT_SUCCESS_CONFIG);
  } else {
    toast.error('Fail Delist!', ALERT_ERROR_CONFIG);
  }
};

export const getList = async (data) => {
  const res = await axios.post(`${API_PATH}/lists/getlist`, data);
  console.log('getList', res.data.result);
  return res.data.result;
};

export const getLinkComponent = (t, link) => {
  return (
    <a href={link} target='_blank' rel='noreferrer'>
      <p className='ps-3 mb-0'>{t}</p>
    </a>
  );
};

export const isOwnerOfUtxo = (utxos, utxo) => {
  if (!utxos || utxos.length <= 0 || utxo) {
    const item = utxos.find((item) => item.txid === utxo.txid);
    if (item) {
      return true;
    }
  }
  return false;
};
