import React, { useState } from 'react'
import { BiUser, BiArrowBack } from 'react-icons/bi'
import { LuMoreHorizontal } from 'react-icons/lu'
import CardPerfilPedidos from '../cards/CardPerfilPedidos';

const Perfil = () => {
    // navegacion de paginas
    const [step, setStep] = useState(1);

    const stepPerfil = () => {
        setStep(1);
    }

    const stepDirecciones = () => {
        setStep(2);
    }

    const stepPedidos = () => {
        setStep(3);
    }

    //mostrar opcion de direccion
    const [showOption, setShowOption] = useState(false)

    const handleShowOption = () => {
        setShowOption(!showOption)
    }


    return (
        <div className='h-screen flex items-center bg-white w-full font-primary'>
            {/* Navegacion */}
            <div className='flex flex-col h-full sm:p-10 bg-[#202020] justify-start items-center'>
                <div className='text-white flex justify-center items-center'>
                    <BiUser size={50} />
                    <p>Agustin</p>
                </div>
                <div className='flex flex-col gap-5 p-2 text-start pt-10'>
                    <div className='flex'>
                        <button className='nav' onClick={stepPerfil}>
                            Perfil
                        </button>
                    </div>
                    <div className='flex' onClick={stepDirecciones}>
                        <button className='nav'>
                            Direcciones
                        </button>
                    </div>
                    <div className='flex' onClick={stepPedidos}>
                        <button className='nav'>
                            Pedidos
                        </button>
                    </div>
                </div>
            </div>
            {/* Ventanas */}
            <div className='flex flex-col h-full justify-start items-start w-full'>
                {step === 1 && (
                    <div className='p-5'>
                        <h1 className='text-5xl pb-10'>Perfil</h1>
                        <div className='border-2 border-[#202020] rounded-md'>
                            <h2 className='text-gray-500 font-bold text-lg pl-1'>Datos personales</h2>
                            <div className='grid grid-cols-1 sm:grid-cols-2 p-2'>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Nombre</h3>
                                    <h3 className='text-gray-500 text-md' >Ocuto</h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Apellido</h3>
                                    <h3 className='text-gray-500 text-md'>Oculto</h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Email</h3>
                                    <h3 className='text-gray-500 text-md'>Oculto</h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>RUT</h3>
                                    <h3 className='text-gray-500 text-md'>Oculto</h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Telefono</h3>
                                    <h3 className='text-gray-500 text-md'>Oculto</h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Fecha de nacimiento</h3>
                                    <h3 className='text-gray-500 text-md'>Oculto</h3>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
                {step === 2 && (
                    <div className=' sm:m-10 p-5 sm:[w-100%] '>
                        <button className='flex items-center gap-2 text-lg text-[#202020] hover:scale-110 duration-300 pb-4' onClick={stepPerfil}>
                            <BiArrowBack size={25} />Atras
                        </button>
                        <h1 className='text-5xl pb-4'>Direcciones</h1>
                        <button className='border-2 border-[#202020] p-2 hover:bg-[#202020] hover:text-white duration-200 hover:animate-jump rounded-md'>
                            Añadir dirección
                        </button>
                        <div className='flex flex-col pt-5'>
                            {/* card de direcciones */}
                            <div className='flex justify-around border-2 text-[#202020] border-[#202020] p-2 gap-52 hover:bg-[#202020] hover:text-white duration-300 hover:border-[#202020] ease-in-out group transition-all rounded-md'>
                                <div className='flex flex-col justify-start items-start p-2 gap-2'>
                                    <h2>Nombre completo..</h2>
                                    <h2 className='text-sm'>Chile</h2>
                                    <div className='text-sm border-2 p-1 border-[#202020] group-hover:bg-[#202020] group-hover:text-white group-hover:border-white duration-300 ease-in-out transition-all rounded-md'>
                                        Facturación
                                    </div>
                                </div>
                                <div className='p-2'>
                                    <button className='' onClick={handleShowOption}>
                                        <LuMoreHorizontal size={30} className='hover:text-purple-600 duration-300' />
                                    </button>
                                    {showOption && (
                                        <button className='absolute bg-white border-[#202020] text-black border-2 p-2 my-8 -ml-16 hover:bg-gray-200 rounded-md'>
                                            Editar
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className='rounded-lg sm:m-10 p-5 sm:[w-100%]'>
                        <button className='flex items-center gap-2 text-lg text-[#202020] hover:scale-110 duration-300 pb-4' onClick={stepPerfil}>
                            <BiArrowBack size={25} />Atras
                        </button>
                        <h1 className='text-5xl pb-5'>Pedidos</h1>
                        <div className='flex flex-col gap-4'>
                            <CardPerfilPedidos />
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Perfil