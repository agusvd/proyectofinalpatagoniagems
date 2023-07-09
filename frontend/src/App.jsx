import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Perfil from './pages/Perfil';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';
import Inventory from './pages/dashboard/Inventory';
import NewProduct from './pages/dashboard/NewProduct';
import UpdateProduct from './pages/dashboard/UpdateProduct'
import Clientes from './pages/dashboard/Clientes';
import NCategoria from './pages/dashboard/NCategoria';
import ProductosTotal from './components/ProductosTotal';
import CartPage from './pages/CartPage';
import ProductosCategoria from './components/ProductosCategoria';
import ProductosDestacados from "./components/ProductosDestacados";
import Anuncio from './components/Anuncio';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfxqAknAAAAADX06900xrbOBnjIZGUjcq7YQEZ4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div><Anuncio /><Navbar /><Home /><ProductosDestacados /><Footer /></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tienda" element={<div><Anuncio /><Navbar /><ProductosTotal /><Footer /></div>} />
          <Route path="/tienda/:categoriaId" element={<div><Anuncio /><Navbar /><ProductosCategoria /><Footer /></div>} />
          <Route path="/perfil" element={<div><Navbar /><Perfil /><Footer /></div>} />
          <Route path="/carrito" element={<div><Navbar /><Anuncio /><CartPage /><Footer /></div>} />
          <Route path="/404" element={<Error />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route exact path="/dashboard" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/dashboard/inventario" element={<PrivateRoute />}>
            <Route exact path="/dashboard/inventario" element={<Inventory />} />
          </Route>
          <Route exact path="/dashboard/inventario/agregar" element={<PrivateRoute />}>
            <Route exact path="/dashboard/inventario/agregar" element={<NewProduct />} />
          </Route>
          <Route exact path="/dashboard/inventario/actualizar/:id" element={<PrivateRoute />}>
            <Route exact path="/dashboard/inventario/actualizar/:id" element={<UpdateProduct />} />
          </Route>
          <Route exact path="/dashboard/clientes" element={<PrivateRoute />}>
            <Route exact path="/dashboard/clientes" element={<Clientes />} />
          </Route>
          <Route exact path="/dashboard/categorias" element={<PrivateRoute />}>
            <Route exact path="/dashboard/categorias" element={<NCategoria />} />
            <Route exact path="/dashboard/categorias/:id" element={<NCategoria />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
};

export default App;
