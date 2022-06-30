import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './component/Products';
import Product from './component/Product';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
