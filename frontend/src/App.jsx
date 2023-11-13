import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
{/* Pages dashboard */}
import Dashboard from './components/pages.dashboard/PageInicio';
import Inventory from './components/pages.dashboard/PageInventario';
import NewProduct from './components/pages.dashboard/PageAgregarProducto';
import UpdateProduct from './components/pages.dashboard/PageActualizarProducto'
import Clientes from './components/pages.dashboard/PageClientes';
import PedidosP from './components/pages.dashboard/PagePedidos';
import NCategoria from './components/pages.dashboard/PageNuevaCategoria';
{/* Pagina tienda */}
import Login from './components/pages.tienda/PageLogin';
import Register from './components/pages.tienda/PageRegister';
import Error from './components/pages.tienda/PageError';
import PageInicio from './components/pages.tienda/PageInicio';
import PageTiendaGeneral from './components/pages.tienda/PageTiendaGeneral';
import PageTiendaPorCategoria from './components/pages.tienda/PageTiendaPorCategoria';
import PagePerfil from './components/pages.tienda/PagePerfil';
import PageCarrito from './components/pages.tienda/PageCarrito';
import PagePago from './components/pages.tienda/PagePago';
import PageProductoEspecifico from './components/pages.tienda/PageProductoEspecifico';
import PageTerminos from './components/pages.tienda/PageTerminos';
{/* Seguridad de google */}
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
{/* Proteccion de rutas */}
import PrivateRoute from './utils/PrivateRoute';



const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfS5RsnAAAAAHNasTesF3XiLU3ZNJtyNclR7ycz">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageInicio/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tienda" element={<PageTiendaGeneral />} />
          <Route path="/tienda/:categoriaId" element={<PageTiendaPorCategoria />} />
          <Route path="/perfil/:id" element={<PagePerfil />} />
          <Route path="/carrito" element={<PageCarrito />} />
          <Route path='/pago' element={<PagePago/>} />
          <Route path='/tienda/producto/:nombre' element={<PageProductoEspecifico />}/>
          <Route path='/terminos-y-condiciones' element={<PageTerminos/>} />
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
