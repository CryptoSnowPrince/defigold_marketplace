import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Explore from './components/explore';
import Mint from './components/mint';
import Start from './components/start';
import Footer from './components/footer';

function App() {
  return (
    <div className='flex flex-col items-start'>
      <Header />
      <Home />
      <Explore />
      <Mint />
      <Start />
      <Footer />
    </div>
  );
}

export default App;
