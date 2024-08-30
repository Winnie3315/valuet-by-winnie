import './App.css'
import { Route, Routes } from "react-router-dom"
import Login from '../pages/Login'
import { BrowserRouter } from "react-router-dom";
import Layout from './Layout/Layout'
import Overview from '../pages/Overview';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
        </Route>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
