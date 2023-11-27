import React from 'react'
import { Link } from 'react-router-dom'

const CardPerfilPedidos = () => {
    return (
        <div className='flex flex-col hover:scale-105 duration-300 ease-in-out'>
            <div className='bg-gray-200 flex justify-around items-center gap-10 p-5 rounded-t-md'>
                <div className='flex flex-col gap-2 justify-center items-start'>
                    <h3 className='text-gray-600'>Id pedido</h3>
                    <h3 className='text-gray-600 text-sm'>Oculto</h3>
                </div>
                <div className='flex flex-col gap-2 justify-center items-start'>
                    <h3 className='text-gray-600'>Fecha del pedido</h3>
                    <h3 className='text-sm'>Oculto</h3>
                </div>
                <div className='flex flex-col gap-2 justify-center items-start'>
                    <h3 className='text-gray-600'>Total</h3>
                    <h3 className='text-sm'>Oculto</h3>
                </div>
                <div className='flex flex-col gap-2 justify-center items-start'>
                    <h3 className='text-gray-600'>Estado del pedido</h3>
                    <h3 className='text-sm'>Oculto</h3>
                </div>
            </div>
            <div className='bg-white flex justify-start items-center gap-10 rounded-b-md border-2 p-2'>
                <div className='flex justify-between items-center w-full'>
                    {/* El usuario puede tener un pedido con mas de un producto */}
                    <Link to={`/tienda/producto/`} className="items-center h-[100px] w-[100px]">
                        <img className='h-full w-full object-container' />
                    </Link>
                    <div className='flex flex-col gap-2 justify-start items-start pl-2'>
                        <h2 className='text-sm text-[#202020]'>Nombre producto</h2>
                        <h3 className='text-sm text-[#202020]'>Fecha de entrega</h3>
                        <h3 className='text-sm text-[#202020]'>Precio unidad</h3>
                    </div>
                    <button className='text-sm border-2 border-[#202020] rounded-md p-2 hover:bg-[#202020] hover:text-white duration-200 hover:animate-fade animate-delay-0'>
                        Ver detalles del pedido
                    </button>
                </div>


            </div>
        </div>
    )
}

export default CardPerfilPedidos