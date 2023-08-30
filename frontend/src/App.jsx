import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
{/* Componentes shared */}
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Anuncio from './components/shared/Anuncio';
{/* Componentes productos */}
import ProductosCategoria from './components/productos/ProductosCategoria';
import ProductosDestacados from "./components/productos/ProductosDestacados";
import ProductosTotal from './components/productos/ProductosTotal';
import ProductosRelacionados from './components/productos/ProductosRelacionados';
{/* Pages */}
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Perfil from './pages/Perfil';
import PrivateRoute from './utils/PrivateRoute';
import Inventory from './pages/dashboard/Inventory';
import NewProduct from './pages/dashboard/NewProduct';
import UpdateProduct from './pages/dashboard/UpdateProduct'
import Clientes from './pages/dashboard/Clientes';
import NCategoria from './pages/dashboard/NCategoria';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import PagoPage from './pages/PagoPage';
import Terminos from './pages/Terminos';
{/* Seguridad de google */}
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfS5RsnAAAAAHNasTesF3XiLU3ZNJtyNclR7ycz">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div><Anuncio /><Navbar /><Home /><ProductosDestacados /><Footer /></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tienda" element={<div><Anuncio /><Navbar /><ProductosTotal /><Footer /></div>} />
          <Route path="/tienda/:categoriaId" element={<div><Anuncio /><Navbar /><ProductosCategoria /><Footer /></div>} />
          <Route path="/perfil" element={<div><Navbar /><Perfil /><Footer /></div>} />
          <Route path="/carrito" element={<div><Navbar /><Anuncio /><CartPage /><Footer /></div>} />
          <Route path='/pago' element={<div><Navbar /><PagoPage/><Footer /></div>} />
          <Route path='/tienda/producto/:nombre' element={<div><Anuncio/><Navbar/><ProductPage/><ProductosRelacionados/><Footer/></div>}/>
          <Route path='/terminos-y-condiciones' element={<div><Navbar/><Terminos/><Footer/></div>} />
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
