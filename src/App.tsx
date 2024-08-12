import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketPix from './payments/TicketPix';

function App() {
  return (
    <>
      <TicketPix />
      <ToastContainer />
    </>
  );
}

export default App;
