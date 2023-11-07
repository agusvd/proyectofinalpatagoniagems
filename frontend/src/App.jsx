import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
{/* Componentes tienda */}
import Navbar from './components/shared.tienda/Navbar';
import Footer from './components/shared.tienda/Footer';
import Anuncio from './components/shared.tienda/Anuncio';
{/* Componentes productos */}
import ProductosCategoria from './components/c.tienda/ProductosCategoria';
import ProductosDestacados from "./components/c.tienda/ProductosDestacados";
import ProductosTotal from './components/c.tienda/ProductosTotal';
import ProductosRelacionados from './components/c.tienda/ProductosRelacionados';
{/* Pages */}
import Home from './components/c.tienda/Home';
import Login from './components/pages.tienda/PageLogin';
import Register from './components/pages.tienda/PageRegister';
import Dashboard from './components/pages.dashboard/PageInicio';
import Error from './components/pages.tienda/PageError';
import Perfil from './components/pages.tienda/PagePerfil';
import PrivateRoute from './utils/PrivateRoute';
import Inventory from './components/pages.dashboard/PageInventario';
import NewProduct from './components/pages.dashboard/PageAgregarProducto';
import UpdateProduct from './components/pages.dashboard/PageActualizarProducto'
import Clientes from './components/pages.dashboard/PageClientes';
import PedidosP from './components/pages.dashboard/PagePedidos';
import NCategoria from './components/pages.dashboard/PageNuevaCategoria';
import CartPage from './components/c.tienda/CartPage';
import ProductPage from './components/c.tienda/ProductPage';
import PagoPage from './components/c.tienda/PagoPage';
import Terminos from './components/pages.tienda/PageTerminos';

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
          <Route exact path="/dashboard/pedidos" element={<PrivateRoute />}>
            <Route exact path="/dashboard/pedidos" element={<PedidosP />} />
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
