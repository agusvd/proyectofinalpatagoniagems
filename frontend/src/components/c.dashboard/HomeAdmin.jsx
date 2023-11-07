import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeAdmin = () => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [valorTotalTienda, setValorTotalTienda] = useState(0);
  const [cantidadUsuarios, setCantidadUsuarios] = useState(0);

  useEffect(() => {
    // Obtener el total de productos
    axios
      .get('http://localhost:8000/dashboard/total-productos')
      .then((res) => {
        setTotalProductos(res.data.total);
      })
      .catch((err) => console.log(err));

    // Obtener el valor total de la tienda
    axios
      .get('http://localhost:8000/dashboard/valor-total-tienda')
      .then((res) => {
        setValorTotalTienda(res.data.valorTotal);
      })
      .catch((err) => console.log(err));

    // Obtener la cantidad de usuarios registrados
    axios
      .get('http://localhost:8000/dashboard/cantidad-usuarios')
      .then((res) => {
        setCantidadUsuarios(res.data.cantidad);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col m-4 mt-10 md:m-4">
      {/* header */}
      <div className='md:m-2 md:rounded-md bg-[#202020]'>
        <div className='flex flex-wrap p-4'>
          <div className="p-4 mx-4 mb-4 flex-grow border-r">
            <h2 className="text-2xl text-white font-bold mb-2">Total de productos</h2>
            <p className="text-2xl text-white">{totalProductos}</p>
          </div>
          <div className="p-4 mx-4 mb-4 flex-grow border-r">
            <h2 className="text-2xl text-white mb-2 font-bold">Valor total del inventario</h2>
            <p className="text-2xl text-white">${valorTotalTienda} CLP</p>
          </div>
          <div className=" p-4 mx-4 mb-4 flex-grow">
            <h2 className="text-2xl text-white mb-2 font-bold">Cantidad de usuarios registrados</h2>
            <p className="text-2xl text-white">{cantidadUsuarios}</p>
          </div>
        </div>
      </div>
      {/* fin hedader */}
      <div className='bg-[#202020] md:m-2 md:rounded-md'>
        <div className='flex flew-wrap gap-2 p-4'>
            <div>
                <a className='text-white'>Aqui va ver los productos vendidos</a>
            </div>
            <div>
                <a className='text-white'>Aqui va ver graficos</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;