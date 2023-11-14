import React from 'react'

const Pedidos = () => {
    return (
        <div className='h-screen overflow-auto'>
            <div className='p-2 flex flex-col rounded-xl'>
                {/* Tabla de pedidos */}
                <div className='foverflow-x-auto overflow-y-auto relative text-[#202020]'>
                    <table className='border-collapse table-auto w-full whitespace-no-wrap table-striped relative'>
                        <thead className=''>
                            <tr className='first-letter:uppercase'>
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