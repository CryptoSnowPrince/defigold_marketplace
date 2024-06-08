import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';

function App() {
  return (
    <div className='flex flex-col items-start'>
      <Header />
      <Home />
    </div>
  );
}

export default App;
