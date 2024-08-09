import { useContext, useRef, useState } from 'react';
import Stepper from 'awesome-react-stepper';
import {
  ALERT_ERROR_CONFIG,
  ALERT_SUCCESS_CONFIG,
  ALERT_WARN_CONFIG,
  API_PATH,
  FILE_MAXSIZE,
  SUCCESS,
} from '../utils/constants';
import { isValidBitcoinAddress } from '../utils/utils';
import { toast } from 'react-toastify';
import validator from 'validator';
import clsx from 'clsx';
import {
  Switch,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { GlobalContext } from '../context/globalContext';

const CollectionInfo = {
  name: '',
  email: '',
  wallet: '',
  symbol: '',
  description: '',
  icon: '',
  preview: null,
  derivated: false,
  artLink: '',
  originalName: '',
  primaryCategory: '',
  secondaryCategory: '',
  twitter: '',
  discord: '',
  website: '',
  tipAddress: '',
  hashList: '',
};

const categories = [
  { id: 1, name: '-' },
  { id: 2, name: 'pfps' },
  { id: 3, name: 'games' },
  { id: 4, name: 'art' },
  { id: 5, name: 'virtual_worlds' },
  { id: 6, name: 'music' },
  { id: 7, name: 'photography' },
  { id: 8, name: 'sports' },
];

function isValidJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

function hasDuplicates(arr) {
  const uniqueElements = new Set(arr);
  return uniqueElements.size !== arr.length;
}

function CreatorHub() {
  const { connected, feeData, ordinalsAddress, satBalance, sendBTC } =
    useContext(GlobalContext);
  const [step, setStep] = useState(1);
  const [derivated, setDerivated] = useState(false);
  const [fieldInvalid, setFieldInvalid] = useState(true);
  const [info, setInfo] = useState(CollectionInfo);
  const [file, setFile] = useState(null);
  const stepperRef = useRef(null);
  const emailRef = useRef(null);
  const walletRef = useRef(null);
  const nameRef = useRef(null);
  const symbolRef = useRef(null);
  const artLinkRef = useRef(null);
  const originalNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const profileRef = useRef(null);
  const twitterRef = useRef(null);
  const [secondQuery, setSecondQuery] = useState(categories);
  const [iframeVisibility, setIframeVisibility] = useState(false);
  const [twitterLink, setTiwitterLink] = useState('');
  const [symbolWarning, setSymbolWarning] = useState(false);

  const onHandleChange = async (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;
    setFieldInvalid(true);
    setInfo((state) => ({ ...state, [name]: value }));
    console.log(step);
    if (step === 1) {
      console.log(
        'step1',
        emailRef.current?.value.trim().length > 0,
        validator.isEmail(emailRef.current?.value),
        isValidBitcoinAddress(walletRef.current?.value)
      );
      if (
        emailRef.current?.value.trim().length > 0 &&
        validator.isEmail(emailRef.current?.value) &&
        isValidBitcoinAddress(walletRef.current?.value)
      ) {
        setFieldInvalid(false);
      }
    }
    if (step === 2) {
      if (
        nameRef.current?.value.trim().length > 0 &&
        symbolRef.current?.value.trim().length > 0
      ) {
        const params = { symbol: symbolRef.current.value };
        const res = await axios.get(`${API_PATH}/collections/checkSymbol`, {
          params,
        });
        console.log(res.data.result);
        if (res.data.result.exist === false) {
          setFieldInvalid(false);
          setSymbolWarning(false);
        } else setSymbolWarning(true);
      }
    }
  };

  const onPrevStep = () => {
    setStep(step - 1);
  };

  const onNextStep = async () => {
    setStep(step + 1);
    setFieldInvalid(true);
    setSymbolWarning(false);
  };

  const handleSubmit = async () => {
    if (!isValidJson(info.hashList)) {
      toast.warn("Hash list doesn't match for JSON Object", ALERT_WARN_CONFIG);
      return;
    }
    const inscriptionList = [];
    JSON.parse(info.hashList).map((item) => {
      inscriptionList.push(item.inscriptionID);
    });
    if (hasDuplicates(inscriptionList)) {
      toast.warn('Duplicated InscriptionID detected.', ALERT_WARN_CONFIG);
      return;
    }
    const checkRes = await axios.post(
      `${API_PATH}/collections/checkInscription`,
      { inscriptionList: JSON.stringify(inscriptionList) }
    );
    if (checkRes.data.result) {
      toast.warn(
        'Hash list includes already taken inscription.',
        ALERT_WARN_CONFIG
      );
      return;
    }
    if (!connected) {
      toast.warn('Connect your wallet first', ALERT_WARN_CONFIG);
      return;
    }
    if (info.description.length < 10) {
      toast.warn(
        'Description must be at least 10 characters long',
        ALERT_WARN_CONFIG
      );
      return;
    }
    if (
      info.description.trim().length === 0 ||
      !file ||
      (derivated &&
        (info.artLink.trim().length === 0 ||
          info.originalName.trim().length === 0)) ||
      info.primaryCategory === '' ||
      info.primaryCategory === '-' ||
      info.secondaryCategory === '' ||
      info.secondaryCategory === '-' ||
      info.primaryCategory === info.secondaryCategory ||
      info.twitter.trim().length === 0
    ) {
      toast.warn('Missing input parameters', ALERT_WARN_CONFIG);
      return;
    }
    const res = await axios.get(`${API_PATH}/utils/getDeposit`);
    const deposit = res.data.result;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('deposit', deposit);
    formData.append('title', info.name);
    formData.append('symbol', info.symbol);
    formData.append('description', info.description);
    formData.append('icon', info.icon);
    formData.append('derivated', info.derivated);
    formData.append('artLink', info.artLink);
    formData.append('originalName', info.originalName);
    formData.append('primaryCategory', info.primaryCategory);
    formData.append('secondaryCategory', info.secondaryCategory);
    formData.append('twitter', info.twitter);
    formData.append('discord', info.discord);
    formData.append('website', info.website);
    formData.append('tipAddress', info.tipAddress);
    formData.append('ownerEmail', info.email);
    formData.append('ownerAddress', ordinalsAddress.address);
    formData.append('hashList', info.hashList);
    console.log(info.primaryCategory, info.secondaryCategory);
    const response = await axios.post(
      `${API_PATH}/collections/addCollection`,
      formData
    );
    if (response.data.status === SUCCESS) {
      toast.success('Collection created successfully.', ALERT_SUCCESS_CONFIG);
      window.location.href = '/collections';
    } else toast.warn(response.data.message, ALERT_ERROR_CONFIG);
  };

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    // if (selectedFile && selectedFile.size <= FILE_MAXSIZE) {
    setFile(selectedFile);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log('file loaded');
      setInfo((state) => ({ ...state, preview: fileReader.result }));
    };
    fileReader.readAsDataURL(selectedFile);
    // } else {
    //   toast.warn(
    //     `File size should be less than ${FILE_MAXSIZE / 1000}KB`,
    //     ALERT_WARN_CONFIG
    //   );
    // }
  }

  return (
    <div className='flex-col w-screen h-full pt-28 lg:pt-48 overflow-y-auto'>
      <div className='px-4 md:px-16'>
        <Stepper
          progressBarClassName='flex w-full md:w-1/2 mx-auto pb-8'
          continueBtn={
            <button
              className='rounded-3xl bg-gray-700 px-8 py-2 disabled:bg-gray-400'
              disabled={fieldInvalid}
              onClick={onNextStep}
            >
              Next
            </button>
          }
          onPrev={onPrevStep}
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col w-full md:w-1/2 mx-auto font-sfui'>
            <h1 className='text-4xl mb-3'>Personal Info</h1>
            <span className='text-xl mb-2'>Tell us about You!</span>
            <label className='text-xl'>Email</label>
            <input
              name='email'
              type='email'
              ref={emailRef}
              onChange={onHandleChange}
              value={info.email}
              required
              className='mb-3 border-[1px] md:w-80 px-2 py-3 font-sfui rounded-md'
            />
            <label className='text-xl'>Wallet Address</label>
            <input
              type='text'
              name='wallet'
              ref={walletRef}
              onChange={onHandleChange}
              value={info.wallet}
              required
              className='mb-3 border-[1px] md:w-80 px-2 py-3 font-sfui rounded-md'
            />
          </div>
          <div className='flex flex-col w-full md:w-1/2 mx-auto font-sfui'>
            <h1 className='text-4xl mb-3'>Collection Info</h1>
            <span className='text-xl mb-2'>
              Tell us about the collection you're minting!
            </span>
            <label className='text-xl'>Collection Name</label>
            <input
              type='text'
              ref={nameRef}
              name='name'
              onChange={onHandleChange}
              required
              className='mb-3 border-[1px] md:w-80 px-2 py-3 font-sfui rounded-md'
            />
            <label className='text-xl'>Collection Symbol</label>
            <input
              type='text'
              ref={symbolRef}
              name='symbol'
              onChange={onHandleChange}
              required
              className='mb-3 border-[1px] md:w-80 px-2 py-3 font-sfui rounded-md'
            />
            {symbolWarning && (
              <span className='text-red-500 text-sm'>
                Current symbol was already taken.
              </span>
            )}
          </div>
          <div className='flex flex-col w-full md:w-1/2 mx-auto font-sfui'>
            <h1 className='text-4xl mb-3'>Listing details</h1>
            <span className='text-xl mb-2'>
              Enter in details on your collection that will be used for your
              marketplace page.
            </span>
            <label className='text-xl'>Collection Description</label>
            <textarea
              rows='2'
              className='mb-8 px-2 py-2 font-sfui rounded-md border-[1px] bg-transparent'
              name='description'
              ref={descriptionRef}
              onChange={onHandleChange}
              value={info.description}
            />
            <label className='text-xl'>Inscription Icon(Optioal)</label>
            <input
              type='text'
              ref={symbolRef}
              name='symbol'
              onChange={onHandleChange}
              required
              className='border-[1px] md:w-80 p-2 font-sfui rounded-md'
            />
            <span className='mb-3 font-sfui'>
              Inscription Icon is the inscription id of the most representative
              token of the collection
            </span>
            <label className='text-xl'>Profile Image</label>
            {info.preview && (
              <img src={info.preview} className='max-h-[500px]' alt='preview' />
            )}
            <button className='relative px-6 py-2 bg-gold rounded-md w-fit mt-4 font-sfui text-xl mb-6'>
              {info.preview ? 'Modify Image' : 'Upload Image'}
              <input
                className='absolute top-0 end-0 start-0 bottom-0 opacity-0'
                type='file'
                name='upload'
                accept='.apng,.gif,.glb,.jpg,.png,.stl,.svg,.webp'
                onChange={handleFileChange}
              />
            </button>
            <label className='text-2xl'>Derivative</label>
            <Switch
              checked={derivated}
              onChange={setDerivated}
              className='group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-blue-400'
            >
              <span
                aria-hidden='true'
                className='pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7'
              />
            </Switch>
            <label className='font-sfui mb-4'>
              Is your artwork a derivative of other artwork on ANY blockchain?
            </label>
            {derivated && (
              <div className='flex flex-col gap-2'>
                <label className='text-xl font-sfui'>
                  Link To The Original Artwork
                </label>
                <input
                  type='text'
                  ref={artLinkRef}
                  name='artLink'
                  onChange={onHandleChange}
                  placeholder='https://'
                  required
                  className='border-[1px] md:w-80 px-2 py-3 mb-4 font-sfui rounded-md'
                />
                <label className='text-xl font-sfui'>Original Name</label>
                <input
                  type='text'
                  ref={originalNameRef}
                  name='originalName'
                  onChange={onHandleChange}
                  placeholder='Collection Name'
                  required
                  className='border-[1px] md:w-80 px-2 py-3 font-sfui rounded-md'
                />
              </div>
            )}
            <label className='text-2xl mb-6'>Categories</label>
            <label className='text-xl font-sfui'>Primary Category</label>
            <select
              name='primaryCategory'
              onChange={onHandleChange}
              value={info.primaryCategory}
              className='w-full md:w-1/2 border-[1px] p-2 rounded-md mb-2 bg-transparent'
            >
              {categories.map((option) => {
                return (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                );
              })}
            </select>
            <span className='font-sfui mb-8'>
              Select the primary category that you would like for this
              collection to be listed under
            </span>
            <label className='text-xl font-sfui'>Secondary Category</label>
            <select
              name='secondaryCategory'
              onChange={onHandleChange}
              value={info.secondaryCategory}
              className='w-full md:w-1/2 border-[1px] p-2 rounded-md mb-2 bg-transparent'
            >
              {categories.map((option) => {
                return (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                );
              })}
            </select>
            <span className='font-sfui mb-8'>
              Select the secondary category for this collection to be listed
              under
            </span>
            <label className='text-2xl mb-6'>Social & Web Links</label>
            <span className='text-xl mb-4'>
              Input your social and website links for your collection. These
              links will be displayed on your collection page
            </span>
            <input
              type='text'
              className='p-2 font-sfui w-full md:w-1/2 border-[1px] rounded-md'
              onChange={onHandleChange}
              name='twitter'
              ref={twitterRef}
              value={info.twitter}
            />
            {/* <span className='text-xl'>Please link your Twitter account</span> */}
            {/* <button onClick={handleTwitterButton}>Link Twitter</button>
            {iframeVisibility && (
              <iframe
                src={twitterLink}
                width='600'
                height='400'
                title='Twitter Auth'
                className='border-none mt-2.5'
              />
            )} */}
            <label className='text-xl font-sfui'>
              Discord Invite Code(Optional)
            </label>
            <span className='font-sfui text-gray-500'>https://discord.gg/</span>
            <input
              type='text'
              className='p-2 font-sfui w-full md:w-1/2 border-[1px] rounded-md'
              onChange={onHandleChange}
              name='discord'
              placeholder='98yXPI'
              value={info.discord}
            />
            <label className='text-xl font-sfui'>Website Url(Optional)</label>
            <input
              type='text'
              className='p-2 font-sfui w-full md:w-1/2 border-[1px] rounded-md'
              onChange={onHandleChange}
              name='website'
              placeholder='https://supercollection.io'
              value={info.website}
            />
            <label className='text-2xl my-6'>Creator Tips</label>
            <span className='text-xl'>Creator Tips Address(Optional)</span>
            <input
              type='text'
              className='p-2 font-sfui mb-6 w-full md:w-1/2 border-[1px] rounded-md'
              onChange={onHandleChange}
              name='tipAddress'
              placeholder='Valid Bitcoin (P2SH/P2WPKH/P2TR) Address'
              value={info.tipAddress}
            />
            <label className='text-2xl my-6'>Hash List</label>
            <textarea
              className='w-full border-[1px] rounded-lg'
              rows='15'
              name='hashList'
              value={info.hashList}
              onChange={onHandleChange}
            />
          </div>
        </Stepper>
      </div>
    </div>
  );
}

export default CreatorHub;
