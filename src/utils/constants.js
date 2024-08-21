import { networks } from 'bitcoinjs-lib';
import { BitcoinNetworkType } from 'sats-connect';

export const REFETCH = 60000;

export const ALERT_DELAY = 5000;
export const ALERT_POSITION = 'top-center';

export const OFFER_UNLIST = -1;
export const OFFER_NOT_STARTED = 0;
export const OFFER_CREATED = 1;
export const OFFER_ALLOWED = 2;
export const OFFER_CANCELED = 3;
export const OFFER_COMPLETED = 4;

export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';

export const CARD_LIST = 0;
export const CARD_UNLIST_EDIT = 1;
export const CARD_PURCHASE = 2;
export const CARD_WITHDRAW = 3;
export const CARD_PREV = 4;
export const CARD_VIEW = 5;

export const SERVICE_FEE = 10000;
export const OUTPUT_UTXO = 546;
export const AI_GENERATION_FEE = 1000;

export const ALERT_WARN_CONFIG = {
  position: ALERT_POSITION,
  autoClose: ALERT_DELAY,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  onClose: undefined,
  className: 'alert-message-warn',
  progressClassName: 'alert-message-warn-progress',
};

export const ALERT_SUCCESS_CONFIG = {
  position: ALERT_POSITION,
  autoClose: ALERT_DELAY,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  onClose: undefined,
  className: 'alert-message-success',
};

export const ALERT_ERROR_CONFIG = {
  position: ALERT_POSITION,
  autoClose: ALERT_DELAY,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  onClose: undefined,
  className: 'alert-message-error',
};

export const WALLETS = [
  {
    name: 'Xverse',
    icon: '/assets/images/wallet/xverse.png',
  },
  {
    name: 'Unisat',
    icon: '/assets/images/wallet/unisat.png',
  },
  {
    name: 'Leather',
    icon: '/assets/images/wallet/leather.png',
  },
  // {
  //   name: 'Alby',
  //   icon: '/assets/images/wallet/alby.png',
  // },
];

export const NET_TYPE_MAIN = 'mainnet';
export const NET_TYPE_TEST = 'testnet';
export const NET_TYPE_REGT = 'regtest';
export const NET_TYPE_LIVE = 'livenet'; // same as mainnet for unisat

export const ADDR_TYPE_PKH = 'p2pkh';
export const ADDR_TYPE_SH = 'p2sh';
export const ADDR_TYPE_WPKH = 'p2wpkh';
export const ADDR_TYPE_WSH = 'p2wsh';
export const ADDR_TYPE_TR = 'p2tr';
export const ADDR_TYPE_SH_WPKH = 'p2sh-p2wpkh';
export const ADDR_TYPE_SH_WSH = 'p2sh-p2wsh';

export const TX_NON_RBF_SEQ = 0xffffffff;
export const TX_RBF_SEQ = 0xfffffffd;

export const ADDR_FOR_PAYMENTS = 1;
export const ADDR_FOR_ORDINALS = 2;

export const FEE_DELTA = 5;
export const SPLIT_CNT = 5;
export const SPLIT_SIZE = 600;

export const MIN_WALLET_SATS = 40000;

export const MINT_PAY_SATS = 4000; // TODO gas fee control

export const FEE_PER_UTXO_SATS = 300; // TODO gas fee control

export const FEE_SATS = 4500; // TODO gas fee control

export const UNISAT_API_KEY_0 =
  '6231ea23b9fbb7a17dd49df9d88ba6686cbbd639a73160cf358bf2e1fdc07b1a'; // cryptosnowprince
export const UNISAT_API_KEY_1 =
  '9118ac95edcd8840388dbc696405ce25166f3bd56a672fc58d3bb01a14e45e33'; // topdirector2017
export const UNISAT_API_KEY_2 =
  '7e3cdf35df526117c07b4958ce71f1c68f0bead84f0f0ff7bf4c167fa00e7693'; // hariwhitedream
export const UNISAT_API_KEY_3 =
  'a03459ecf86d2984275f4a08b8e5129adc5065b35f2e4d00e23cbb8b11333fc6'; // rogerdtilton
export const UNISAT_API_KEY_4 =
  'af86509f50d854685beb01b004e4a1eab801164d5a9109643b57428666340b05'; // cavelionhunter

export function RELEASE(param1, param2, ...param3) {
  return;
}
export const DEBUG = console.log;

// export const API_PATH = 'https://nft.defi.gold/api';
export const API_PATH = 'https://nft.defi.gold.metabest.tech/api'; //dev mode
// export const API_PATH = 'http://localhost:7777/api'; //dev local mode

// export const DOWNLOAD_PATH = 'https://nft.defi.gold/download';
export const DOWNLOAD_PATH = 'https://nft.defi.gold.metabest.tech/download'; //dev mode
// export const DOWNLOAD_PATH = 'http://localhost:7777/download'; //dev local mode

/******************************************/
export const NETWORK = NET_TYPE_TEST; // TODO
/******************************************/

export const FILE_MAXSIZE = NETWORK === NET_TYPE_TEST ? 1000 : 400_000;
export const network =
  NETWORK === NET_TYPE_TEST ? networks.testnet : networks.bitcoin;
export const xverseNetwork =
  NETWORK === NET_TYPE_TEST
    ? BitcoinNetworkType.Testnet
    : BitcoinNetworkType.Mainnet;

export const MARKET_ADDRESS =
  NETWORK === NET_TYPE_TEST
    ? 'tb1qzw5yzjnkngrfzsy7xkzlj0y8nvjthd7zxr08mn'
    : 'bc1qzw5yzjnkngrfzsy7xkzlj0y8nvjthd7zv955qq';

export const UNISAT_URL = `https://static${
  NETWORK === NET_TYPE_TEST ? '-testnet' : ''
}.unisat.io`;
export const UNISAT_API = `https://open-api${
  NETWORK === NET_TYPE_TEST ? '-testnet' : ''
}.unisat.io`;
export const MEMPOOL_URL = `https://mempool.space${
  NETWORK === NET_TYPE_TEST ? '/testnet' : ''
}`;
export const ORDINALS_URL = `https://${
  NETWORK === NET_TYPE_TEST ? 'testnet.' : ''
}scan.defi.gold`;

export const RUN_MODE = DEBUG;
