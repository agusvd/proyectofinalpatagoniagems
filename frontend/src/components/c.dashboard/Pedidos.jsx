import React from 'react'

const Pedidos = () => {
    return (
        <div className='font-primary h-screen overflow-auto bg-black'>
            <div className='md:p-2 md:mx-6 md:my-6 flex flex-col bg-[#202020] rounded-xl'>
                {/* Header */}
                <div className=''>
                    <h1 className='text-5xl text-white font-extrabold '>Pedidos</h1>
                </div>
                {/* Fin Header */}
                {/* Tabla de pedidos */}
                <div className='foverflow-x-auto overflow-y-auto relative'>
                    <table className='border-collapse table-auto w-full whitespace-no-wrap table-striped relative'>
                        <thead className=''>
                            <tr className='text-white first-letter:uppercase'>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Fecha
                                </th>
                                <th>
                                    Estado
                                </th>
                                <th>
                                    Nombre
                                </th>
                                <th>
                                    Producto
                                </th>
                                <th>
                                    Precio
                                </th>
                                <th>
                                    Cantidad
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Pedidos