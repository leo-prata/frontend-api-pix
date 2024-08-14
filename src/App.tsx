import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketPix from './pages/payments/TicketPix';
import PaginaInicial from './pages/index';
import JogoDetalhes from './pages/jogoDetalhes';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/pagamento" element={<TicketPix />} />
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/jogo/:id" element={<JogoDetalhes />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
