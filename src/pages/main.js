import Home from '../components/home';
import Explore from '../components/explore';
import Mint from '../components/mint';
import Start from '../components/start';
import Footer from '../components/footer';

const Main = () => {
  return (
    <div className='flex flex-col items-start'>
      <Home />
      <Explore />
      <Mint />
      <Start />
      <Footer />
    </div>
  );
};

export default Main;
