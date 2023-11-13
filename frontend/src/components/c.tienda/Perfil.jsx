import React, { useState, useEffect } from 'react'
import { BiUser, BiArrowBack } from 'react-icons/bi'
import { LuMoreHorizontal } from 'react-icons/lu'
import CardPerfilPedidos from '../cards/CardPerfilPedidos';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const Perfil = () => {
    // navegacion de paginas
    const [step, setStep] = useState(1);

    const stepPerfil = () => {
        setStep(1);
    }

    const stepPedidos = () => {
        setStep(2);
    }

    //mostrar opcion de direccion
    const [showOption, setShowOption] = useState(false)

    const handleShowOption = () => {
        setShowOption(!showOption)
    }

    // obtener la informacion del usuario
    const [usuario, setUsuario] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/perfil/${id}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setUsuario(null);
                } else {
                    setUsuario(res.data[0]);
                }
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (usuario === null) {
        return (
            <div>
                <div className="font-primary">
                    <div className="h-screen text-white bg-black flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-bold mb-4">usuario no encontrado</h1>
                        <Link to="/" className="text-white bg-purple-500 hover:bg-pink-600 transition-all duration-150 rounded-full p-2">Volver a la tienda</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='h-screen flex items-center bg-white w-full font-primary'>
            {/* Navegacion */}
            <div className='flex flex-col h-full sm:p-10 bg-[#202020] justify-start items-center'>
                <div className='text-white flex justify-center items-center'>
                    <BiUser size={50} />
                    <p></p>
                </div>
                <div className='flex flex-col gap-5 p-2 text-start pt-10'>
                    <div className='flex'>
                        <button className='nav' onClick={stepPerfil}>
                            Perfil
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
                    <div className='sm:m-10 p-5 flex flex-col'>
                        <h1 className='text-5xl pb-10'>Perfil</h1>
                        <div className='border-2 border-[#202020] rounded-md'>
                            <h2 className='text-gray-500 font-bold text-lg pl-1'>Datos personales</h2>
                            <div className='flex flex-col gap-2 p-2'>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Nombre</h3>
                                    <h3 className='text-gray-500 text-md'>{usuario.nombre}</h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Apellido</h3>
                                    <h3 className='text-gray-500 text-md'>{usuario.apellido}</h3>
                                </div>
                                <div className=''>
                                    <h3 className='text-xl text-[#202020]'>Email</h3>
                                    <h3 className='text-gray-500 text-md'>{usuario.email}</h3>
                                </div>
                            </div>
                        </div>
                        <h1 className='text-5xl pb-4 pt-10'>Direcciones</h1>
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
                {step === 2 && (
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