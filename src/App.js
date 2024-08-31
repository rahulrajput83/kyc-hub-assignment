import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Navbar from './Components/Navbar/Navbar'
import Compare from './Pages/Compare/Compare';
import { useEffect, useState } from 'react';

function App() {
  
  return (
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/' element={<ProductDetails />} />
        <Route path='/compare' element={<Compare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
