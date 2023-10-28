import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Cart from './Pages/Cart';
import Bill from './Pages/Bill';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bill" element={<Bill />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
