import React from 'react'

const CardToastAgregarCarro = ({ producto, visible }) => {
    return (
        <div className={`${visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <img className="h-32 w-32 object-contain" src={producto.imagen} alt="" />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-purple-600">
                            {producto.nombre}
                        </p>
                        <p className="mt-1 text-md text-black">
                            Producto agregado al carrito
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardToastAgregarCarro