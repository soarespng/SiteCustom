import './App.css'
import Navbar from './components/Navbar/Navbar'

const App = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='main-content'>{children}</div>
    </div>
  );
};

export default App
