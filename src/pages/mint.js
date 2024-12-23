import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { ArrowUpTrayIcon, EyeIcon } from '@heroicons/react/24/outline';

import {
  API_PATH,
  SUCCESS,
  SERVICE_FEE,
  OUTPUT_UTXO,
  FILE_MAXSIZE,
  ALERT_WARN_CONFIG,
  ALERT_ERROR_CONFIG,
  FEE_DELTA,
  MIN_WALLET_SATS,
  ALERT_SUCCESS_CONFIG,
  UNISAT_URL,
  AI_GENERATION_FEE,
} from '../utils/constants';
import { getLinkComponent, timeEstimate } from '../utils/utils';
import { GlobalContext } from '../context/globalContext';
import { toast } from 'react-toastify';

const Mint = ({ setWalletPanel }) => {
  const { connected, feeData, ordinalsAddress, satBalance, sendBTC } =
    useContext(GlobalContext);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [pendingInscribe, setPendingInscribe] = useState(false);
  const [pendingEstimate, setPendingEstimate] = useState(false);
  const [pendingGenerate, setPendingGenerate] = useState(false);
  const [estimateFeeSats, setEstimateFeeSats] = useState(0);
  const [value, setValue] = useState({ feeRate: '' });
  const [error, setError] = useState({});
  const [NFTType, setNFTType] = useState('upload');
  const promptRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const checkValidation = (input, inputValue) => {
    let terror = 0;
    let message = '';
    var reg;
    switch (input) {
      case 'feeRate':
        inputValue = parseFloat(inputValue);
        reg = new RegExp(/^[+-]?\d+(\.\d+)?$/);
        if (
          !reg.test(inputValue) ||
          inputValue < feeData.minimumFee ||
          inputValue > feeData.fastestFee + FEE_DELTA
        ) {
          terror += 1;
          message = 'Please Enter Valid FeeRate!';
        } else {
          message = '';
        }
        break;

      case 'tokenAddress':
        if (inputValue < 0) {
          terror += 1;
          message = 'Please Select Currency!';
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

  const checkAllValidation = () => {
    let terror = 0;
    Object.keys(value).map((key, index) => {
      if (error[key] !== undefined && error[key].length > 0) terror += 1;
      return true;
    });
    if (value.feeRate.length === 0) terror += 1;
    console.log(terror);
    if (terror > 0) {
      return false;
    } else {
      return true;
    }
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    checkValidation(e.target.name, e.target.value);
    setValue({ ...value, [e.target.name]: e.target.value });
    setEstimateFeeSats(0);
  };

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= FILE_MAXSIZE) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
      setEstimateFeeSats(0);
    } else {
      toast.warn(
        `File size should be less than ${FILE_MAXSIZE / 1000}KB`,
        ALERT_WARN_CONFIG
      );
    }
  }

  const handleEstimateMint = async (e) => {
    e.preventDefault();
    if (pendingInscribe || pendingEstimate || pendingGenerate) {
      toast.warn('Pending... Please wait for few seconds!', ALERT_WARN_CONFIG);
      return;
    }
    console.log(connected, ordinalsAddress.address, file);

    if (
      (NFTType !== 'AI' &&
        checkAllValidation() &&
        connected &&
        ordinalsAddress.address &&
        file) ||
      (NFTType === 'AI' && connected && ordinalsAddress.address && file)
    ) {
      setPendingEstimate(true);
      console.log(connected, ordinalsAddress.address, file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', NFTType);
      formData.append('feeRate', value.feeRate);
      formData.append('ordinal', ordinalsAddress.address);
      if (NFTType === 'AI') formData.append('path', previewUrl);
      console.log(formData);
      try {
        const response = await axios.post(
          `${API_PATH}/users/estimateInscribe`,
          formData
        );
        console.log(response.data);
        if (response.data.status === SUCCESS) {
          setEstimateFeeSats(response.data.result.satoshi);
          const totalSats =
            response.data.result.satoshi + OUTPUT_UTXO + SERVICE_FEE;
          console.log(totalSats, MIN_WALLET_SATS);
        } else {
          toast.error('Estimate Fail. Please try again.', ALERT_ERROR_CONFIG);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          `Something went wrong!  errCode: ${error}`,
          ALERT_ERROR_CONFIG
        );
      }
      setPendingEstimate(false);
    } else {
      if (!checkAllValidation()) {
        toast.warn(`Please fill the input data correctly.`, ALERT_WARN_CONFIG);
      } else if (!file) {
        toast.warn(`Please select your artifact.`, ALERT_WARN_CONFIG);
      } else if (!connected || !ordinalsAddress.address) {
        toast.warn(`Please connect wallet.`, ALERT_WARN_CONFIG);
      } else {
        toast.warn(`Something went wrong.`, ALERT_WARN_CONFIG);
      }
    }
  };

  const handleMint = async (e) => {
    e.preventDefault();
    if (pendingInscribe || pendingEstimate || pendingGenerate) {
      toast.warn(`Pending... Please wait for few seconds!`, ALERT_WARN_CONFIG);
      return;
    }

    if (checkAllValidation() && file && connected && ordinalsAddress.address) {
      setPendingInscribe(true);

      const formData = new FormData();
      if (NFTType === 'AI') formData.append('path', previewUrl);
      formData.append('file', file);
      formData.append('type', NFTType);
      formData.append('feeRate', value.feeRate);
      formData.append('ordinal', ordinalsAddress.address);
      try {
        const response = await axios.post(
          `${API_PATH}/users/estimateInscribe`,
          formData
        );
        if (response.data.status === SUCCESS) {
          setEstimateFeeSats(response.data.result.satoshi);
          const totalSats =
            response.data.result.satoshi + OUTPUT_UTXO + SERVICE_FEE;
          if (satBalance > totalSats + MIN_WALLET_SATS) {
            const txId = await sendBTC(
              response.data.result.deposit,
              totalSats,
              1
            );
            console.log('txId for pay incribe: ', txId);
            formData.append('deposit', response.data.result.deposit);
            formData.append('depositTx', txId);
            formData.append('order', response.data.result.order);
            formData.append('satoshi', response.data.result.satoshi);
            const insResponse = await axios.post(
              `${API_PATH}/users/inscribe`,
              formData
            );
            console.log('insResponse.data res: ', insResponse.data);
            if (insResponse.data.status === SUCCESS) {
              console.log('Inscribed Successfully!', insResponse.data.result);
              toast.success(
                getLinkComponent(
                  'Inscribed Successfully!',
                  `${UNISAT_URL}/content/${insResponse.data.result.inscriptions[0].id}`
                ),
                ALERT_SUCCESS_CONFIG
              );
            } else toast.warn(insResponse.data.message, ALERT_ERROR_CONFIG);
          } else {
            toast.warn(`Insufficient BTC!`, ALERT_ERROR_CONFIG);
          }
        } else {
          toast.error(`Estimate error!`, ALERT_ERROR_CONFIG);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          `Something went wrong!  errCode: ${error}`,
          ALERT_ERROR_CONFIG
        );
      }
      setPendingInscribe(false);
    } else {
      if (!checkAllValidation()) {
        toast.warn(`Please fill the input data correctly.`, ALERT_WARN_CONFIG);
      } else if (!file) {
        toast.warn(`Please select your artifact.`, ALERT_WARN_CONFIG);
      } else if (!connected || !ordinalsAddress.address) {
        toast.warn(`Please connect wallet.`, ALERT_WARN_CONFIG);
      } else {
        toast.warn(`Something went wrong.`, ALERT_WARN_CONFIG);
      }
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (pendingInscribe || pendingEstimate || pendingGenerate) {
      toast.warn(`Pending... Please wait for few seconds!`, ALERT_WARN_CONFIG);
      return;
    }
    const prompt = promptRef.current.value;
    if (prompt.trim().length === 0) {
      toast.warn('Input image prompt.', ALERT_WARN_CONFIG);
      return;
    }
    const res = await axios.get(`${API_PATH}/utils/getDeposit`);
    const deposit = res.data.result;
    setPendingGenerate(true);
    try {
      if (satBalance > AI_GENERATION_FEE + MIN_WALLET_SATS) {
        const txId = await sendBTC(deposit, AI_GENERATION_FEE, 1);
        console.log('txId for pay incribe: ', txId);
        const response = await axios.post(`${API_PATH}/utils/generateAIImage`, {
          prompt: prompt,
        });
        if (response.data.status === SUCCESS) {
          setPreviewUrl(response.data.result[0]);
          const fileRes = await fetch(response.data.result[0]);
          const blob = await fileRes.blob();
          const imgFile = new File([blob], 'image.jpg', { type: blob.type });
          setFile(imgFile);
        } else {
          toast.error('AI image generation failed', ALERT_ERROR_CONFIG);
        }
      } else {
        toast.warn(`Insufficient BTC!`, ALERT_ERROR_CONFIG);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Something went wrong!  errCode: ${error}`,
        ALERT_ERROR_CONFIG
      );
    }
    setPendingGenerate(false);
  };

  const handleImageTypeChanged = (e) => {
    setNFTType(e.target.value);
  };

  return (
    <div className='lg:py-60 py-28 xl:px-56 px-5 lg:px-28 flex flex-col'>
      <span className='font-sfui text-white text-center lg:text-6xl font-bold text-xl'>
        Mint your NFT
      </span>
      <div className='flex flex-row font-sfui mt-12 rounded-lg gap-6'>
        <div className='flex flex-col h-fit flex-1 bg-primary rounded-lg px-4 py-6 gap-6 border border-gray-700'>
          <div className='flex flex-col gap-1'>
            <select
              className='max-w-fit p-2 border-gray-700 rounded-md border-2'
              onChange={handleImageTypeChanged}
              disabled={pendingInscribe || pendingEstimate || pendingGenerate}
            >
              <option className='p-2' value='upload'>
                Upload your artifact
              </option>
              <option className='p-2' value='AI'>
                Generate AI artifact
              </option>
            </select>
            {/* <span className=''>Upload your artifact</span> */}
            {NFTType === 'upload' ? (
              <div className='relative flex flex-col py-6 items-center text-center rounded-xl border-2 border-gray-700 gap-4 cursor-pointer'>
                <div className='bg-dark-box p-2 rounded-full flex justify-center items-center'>
                  <ArrowUpTrayIcon className='h-6 w-6 text-gray-500' />
                </div>
                <span className='text-hint-text'>
                  Drop file or click to select.
                </span>
                <span className='text-hint-text'>
                  {`Must be <${FILE_MAXSIZE / 1000}kb each of type.`}
                </span>
                <span className='text-hint-text'>
                  Supported type: apng gif glb jpg png stl svg webp.
                </span>
                <input
                  className='absolute top-0 end-0 start-0 bottom-0 opacity-0'
                  type='file'
                  name='upload'
                  accept='.apng,.gif,.glb,.jpg,.png,.stl,.svg,.webp'
                  disabled={pendingInscribe || pendingEstimate}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <textarea
                className='border-2 border-gray-700 p-2 rounded-xl focus:border-gray-700'
                rows='8'
                placeholder='Input AI image prompt here.'
                ref={promptRef}
              ></textarea>
            )}
          </div>
          <div className='block lg:hidden h-full bg-dark-box border border-gray-700 rounded-lg p-4'>
            {!previewUrl ? (
              <div className='flex flex-col justify-center min-h-[70vw] items-center'>
                <span className='text-3xl'>Preview NFT</span>
                <EyeIcon className='h-6 w-6 text-gray-500' />
              </div>
            ) : (
              <img
                className='rounded-lg w-full h-full'
                src={previewUrl}
                title=''
                alt=''
              />
            )}
          </div>
          <div className='flex flex-col gap-1 mb-6'>
            <span className=''>Fee Rate</span>
            <input
              type='number'
              name='feeRate'
              className='form-control p-2 rounded-md border bg-dark-text border-gray-700 focus:border-gray-700 active:border-gray-700'
              min={feeData.minimumFee}
              max={feeData.fastestFee + FEE_DELTA}
              disabled={pendingInscribe || pendingEstimate}
              placeholder='Enter fee rate'
              onChange={onChangeInput}
            />
            <span className='text-hint-text'>
              {`Range: ${feeData.minimumFee}~${
                feeData.fastestFee + FEE_DELTA
              } sats/vB. Suggested: ${feeData.economyFee} sats/vB Fastest: ${
                feeData.fastestFee
              } sats/vB Default: ${feeData.halfHourFee} sats/vB.`}
            </span>
            <span className='text-hint-text'>
              {`Time Estimate: ${timeEstimate(value.feeRate, feeData)}`}
            </span>
            <small className='text-danger text-red-600'>{error.feeRate}</small>
          </div>
          {estimateFeeSats > 0 && (
            <div className='flex lg:hidden flex-col bg-dark-box border border-gray-700 rounded-lg p-4'>
              <div className='flex justify-between'>
                <span className='font-sfui'>Mint Fee:</span>
                <span className='font-sfui'>{`${estimateFeeSats} sats`}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-sfui'>Output UTXO:</span>
                <span className='font-sfui'>{`${OUTPUT_UTXO} sats`}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-sfui'>Service Fee:</span>
                <span className='font-sfui'>{`${SERVICE_FEE} sats`}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-sfui'>Total as Sats:</span>
                <span className='font-sfui'>{`${
                  estimateFeeSats + OUTPUT_UTXO + SERVICE_FEE
                } sats`}</span>
              </div>
            </div>
          )}
          <div className='flex flex-col sm:flex-row px-4 gap-8 justify-center'>
            {connected && NFTType === 'AI' && (
              <button
                className='w-full bg-gold text-dark-text font-sfui text-sm lg:text-lg py-2 rounded-lg flex gap-2 justify-center items-center'
                disabled={pendingInscribe || pendingEstimate || pendingGenerate}
                onClick={(e) => handleGenerate(e)}
              >
                {pendingGenerate ? `Generating Now...` : `Generate`}
              </button>
            )}
            {!connected ? (
              <button
                className='bg-gold w-full text-dark-text font-sfui text-sm lg:text-lg py-2 rounded-lg flex gap-2 justify-center items-center'
                onClick={setWalletPanel}
              >
                CONNECT WALLET
              </button>
            ) : (
              <button
                className='w-full bg-gold text-dark-text font-sfui text-sm lg:text-lg py-2 rounded-lg flex gap-2 justify-center items-center'
                disabled={pendingInscribe || pendingEstimate}
                onClick={(e) => handleEstimateMint(e)}
              >
                {pendingEstimate ? `Estimating...` : `Estimate`}
              </button>
            )}
            {connected && (
              <button
                className='w-full bg-gold text-dark-text font-sfui text-sm lg:text-lg py-2 rounded-lg flex gap-2 justify-center items-center'
                disabled={pendingInscribe || pendingEstimate}
                onClick={(e) => handleMint(e)}
              >
                {pendingInscribe ? `Minting Now...` : `Mint Now`}
              </button>
            )}
          </div>
        </div>
        <div className='hidden lg:flex flex-[0.5] flex-col gap-2'>
          <div className='hidden lg:flex h-full bg-dark-box border border-gray-700 rounded-lg p-4 justify-center'>
            {!previewUrl ? (
              <div className='flex flex-col justify-center items-center'>
                <span className='text-3xl'>Preview NFT</span>
                <EyeIcon className='h-8 w-8 text-gray-500' />
              </div>
            ) : (
              <img
                className='rounded-lg w-full h-full'
                src={previewUrl}
                title=''
                alt=''
              />
            )}
          </div>
          <br />
          {estimateFeeSats > 0 && (
            <div className='flex flex-col bg-dark-box border border-gray-700 rounded-lg p-4'>
              <div className='flex justify-between'>
                <span className='font-sfui'>Mint Fee:</span>
                <span className='font-sfui'>{`${estimateFeeSats} sats`}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-sfui'>Output UTXO:</span>
                <span className='font-sfui'>{`${OUTPUT_UTXO} sats`}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-sfui'>Service Fee:</span>
                <span className='font-sfui'>{`${SERVICE_FEE} sats`}</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-sfui'>Total as Sats:</span>
                <span className='font-sfui'>{`${
                  estimateFeeSats + OUTPUT_UTXO + SERVICE_FEE
                } sats`}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mint;
