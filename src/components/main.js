import Home from './home';
import Explore from './explore';
import Mint from './mint';
import Start from './start';
import Footer from './footer';

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
