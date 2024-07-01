import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/header';
import ProgressBar from './components/progressbar';
import { GlobalContext, useGlobalContext } from './context/globalContext';
import Navbar from './components/navbar';
import WalletModal from './components/walletModal';
import Main from './pages/main';
import Detail from './pages/detail';
import Profile from './pages/profile';
import Footer from './components/footer';
import Mint from './pages/mint';
import Explorer from './pages/explorer';
import ScrollToTopButton from './components/scroll';
import Soon from './pages/soon';
import Terms from './pages/terms';
import Policy from './pages/policy';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showWalletPanel, setShowWalletPanel] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const context = useGlobalContext();

  const modifyNavbarStatus = () => {
    setShowNavbar(!showNavbar);
  };

  const modifyWalletPanel = () => {
    setShowWalletPanel(!showWalletPanel);
  };

  useEffect(() => {
    const resources = [...document.images];
    const totalResources = resources.length + 1; // +1 for the fonts
    let loadedResources = 0;

    const updateProgress = () => {
      loadedResources += 1;
      const percent = Math.floor((loadedResources / totalResources) * 100);
      setProgress(percent);
      if (loadedResources === totalResources) {
        setIsLoaded(true);
      }
    };

    resources.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress); // Consider resource loaded even on error
      }
    });

    document.fonts.ready.then(updateProgress);

    if (totalResources === 1) {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return <ProgressBar progress={progress} />;
  }

  return (
    <GlobalContext.Provider value={context}>
      <Router>
        <div className='relative w-[100vw] overflow-x-hidden'>
          <Header
            visibility={showNavbar}
            setNavbar={modifyNavbarStatus}
            setWalletPanel={modifyWalletPanel}
          />
          <Navbar showNavbar={showNavbar} modifyNavbar={modifyNavbarStatus} />
          <WalletModal
            visible={showWalletPanel}
            setVisible={modifyWalletPanel}
          />
          {!showNavbar && (
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/detail' element={<Detail />} />
              <Route
                path='/detail/:resId'
                element={<Detail setWalletPanel={modifyWalletPanel} />}
              />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/:wallet' element={<Profile />} />
              <Route
                path='/mint'
                element={<Mint setWalletPanel={modifyWalletPanel} />}
              />
              <Route path='/explorer' element={<Explorer />} />
              <Route path='/collections' element={<Soon />} />
              <Route path='/terms' element={<Terms />} />
              <Route path='/policy' element={<Policy />} />
            </Routes>
          )}
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
      <ToastContainer />
    </GlobalContext.Provider>
  );
}

export default App;
