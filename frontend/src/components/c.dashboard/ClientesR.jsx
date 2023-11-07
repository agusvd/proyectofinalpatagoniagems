import React from 'react'

const ClientesR = () => {
    return (
        <div className='font-primary h-screen overflow-auto bg-black'>
            <div className='md:p-2 md:mx-6 md:my-6 flex flex-col bg-[#202020] rounded-xl'>
                {/* Header */}
                <div className=''>
                    <h1 className='text-5xl text-white font-extrabold '>Clientes</h1>
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
                                    Nombre
                                </th>
                                <th>
                                    Correo
                                </th>
                                <th>
                                    Compras
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ClientesR