import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BiSearch } from 'react-icons/bi'

const ClientesR = () => {
    const [usuarios, setUsuarios] = useState([])
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [consulta, setConsulta] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const usuariosPorPagina = 10;

    useEffect(() => {
        axios
            .get('http://localhost:8000/usuarios')
            .then((res) => {
                console.log(res.data);
                setUsuarios(res.data);
                setUsuariosFiltrados(res.data);

            })
            .catch((err) => console.log(err));
    }, []);


    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
    const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
    const usuariosActuales = usuariosFiltrados.slice(indicePrimerUsuario, indiceUltimoUsuario);

    const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

    const numerosPagina = [];
    for (let i = 1; i <= totalPaginas; i++) {
        numerosPagina.push(i);
    }

    return (
        <div className="h-screen overflow-auto bg-white">
            <div className="flex flex-col p-2">
                <div className="flex flex-col sm:flex-row items-center justify-center">
                    <div className="flex items-center justify-center bg-gray-200 text-[#202020] p-2 rounded-xl w-full md:w-2/4 m-4">
                        <BiSearch size={20} className="text-[#202020]" />
                        <input type="text" placeholder="Buscar cliente"
                            className="search py-1 px-3 ml-2 text-[#202020] bg-gray-200 outline-none w-full"
                            onChange={(e) => {
                                setConsulta(e.target.value);
                                const filtrados = usuarios.filter((usuarios) =>
                                    usuarios.nombre.toLowerCase().includes(e.target.value.toLowerCase())
                                );
                                setUsuariosFiltrados(filtrados);
                            }} />
                    </div>
                </div>
                {/* fin header */}
                <div className="overflow-y-auto relative">
                    <table className='table-auto w-full p-2'>
                        <thead className='text-[#202020]'>
                            <tr className=''>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Nombre Completo
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Rol
                                </th>
                            </tr>
                        </thead>
                        {usuariosActuales.length > 0 ? (
                            usuariosActuales.map((usuarios) => (
                                <tbody key={usuarios.id}>
                                    <tr className='text-[#202020] first-letter:uppercase cursor-pointer hover:bg-gray-200 duration-300 ease-in-out text-center'>
                                        <td className='text-center'>
                                            {usuarios.id}
                                        </td>
                                        <td className='gap-2 flex items-center justify-center first-letter:uppercase'>
                                            <p>{usuarios.nombre}</p>
                                            <p>{usuarios.apellido}</p>
                                        </td>
                                        <td>
                                            {usuarios.email}
                                        </td>
                                        <td>
                                            {usuarios.role}
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <p className='text-white text-xl'>No hay usuarios registrados</p>
                        )}

                    </table>
                </div>
                {totalPaginas > 1 && (
                    <div className="flex justify-center my-4">
                        {numerosPagina.map((numero) => (
                            <button key={numero} onClick={() => cambiarPagina(numero)} className={`mx-1 px-3 py-1 rounded-md ${paginaActual === numero ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                {numero}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClientesR