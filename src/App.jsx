import './App.css'
import { Route, Routes } from "react-router-dom"
import Login from '../pages/Login'
import { BrowserRouter } from "react-router-dom";
import Layout from './Layout/Layout'
import Overview from '../pages/Overview';
import Wallets from '../pages/Wallets';
import Transactions from '../pages/Transactions';
import AddWallet from '../pages/AddWallet';
import AddTransaction from '../pages/AddTransaction';
import Convertation from '../pages/Convertation';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="/wallet" element={<Wallets />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/exchange" element={<Convertation />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/add-wallet" element={<AddWallet />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
