import React from 'react';

const CardToastEliminarCategoria = ({ categoria, onConfirm, visible, onClose }) => {
    return (
        <div className={`${visible ? 'animate-enter' : 'animate-leave'} w-[300px] bg-[#202020] shadow-lg rounded-lg pointer-events-auto flex flex-col p-2`}>
            <div>
                <p className='text-purple-500 text-xl'>¿Estás seguro de que deseas eliminar la categoría "{categoria.categoria}"?</p>
            </div>
            <div className="flex justify-end mt-4">
                <button className="mr-2 text-white hover:text-red-600 text-xl" onClick={onConfirm}>
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default CardToastEliminarCategoria;
