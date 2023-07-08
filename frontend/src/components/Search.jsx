import React, { useState, useEffect } from 'react';
import { BiArrowFromLeft } from 'react-icons/bi';
import axios from 'axios';
import ProductoEjemplo from '../assets/producto1.png';

const Search = ({ onClose }) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSearch = async () => {
        if (searchText.trim() === '') {
            setSearchResults([]);
            setTotalPages(1);
            setCurrentPage(1);
            return;
        }

        try {
            const response = await axios.get('http://localhost:8000/productos/buscar', {
                params: {
                    searchText: searchText
                }
            });
            setSearchResults(response.data);
            setTotalPages(Math.ceil(response.data.length / 10)); // Asumiendo 10 productos por página
            setCurrentPage(1); // Reiniciar la página actual a 1
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };

    useEffect(() => {
        handleSearch(); // Actualizar los resultados al montar el componente
    }, []);

    useEffect(() => {
        handleSearch(); // Actualizar los resultados en tiempo real
    }, [searchText]);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight) {
            setCurrentPage((prevPage) => prevPage + 1); // Cargar la siguiente página de resultados
        }
    };

    return (
        <div className="bg-white text-black absolute right-0 top-0 w-3/4 h-screen z-99 font-primary md:w-2/6">
            <div className="flex-col items-center">
                <div className="flex items-center justify-between m-4">
                    <h2 className="text-black mr-4 text-xl">Buscar</h2>
                    <BiArrowFromLeft
                        size={30}
                        className="text-black cursor-pointer hover:text-purple-500"
                        onClick={onClose}
                    />
                </div>
                <br />
                <ul>
                    <li className="border-t border-gray-400 pt-2 pb-2"></li>
                </ul>
                <br />
                <div className="">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="py-2 px-5 bg-white text-black outline-none w-full border-2 rounded-full mx-10"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyUp={handleSearch} // Llamar a handleSearch en cada pulsación de tecla
                        />
                    </div>
                </div>
                {/* Mostrar los resultados de la búsqueda */}
                <div className="" style={{ maxHeight: '700px', overflowY: 'scroll' }} onScroll={handleScroll}>
                    {searchText.trim() !== '' && (
                        <div className='text-center bg-white border-t border-b p-2 mt-10 shadow-lg'>
                            <h3 className='text-sm font-bold'>Resultados de la búsqueda</h3>
                        </div>
                    )}
                    <ul>
                        {searchResults.slice(0, currentPage * 10).map((producto) => (
                            <li key={producto.id} className="flex m-4">
                                <div className="flex p-2">
                                    <img src={ProductoEjemplo} alt={producto.nombre} className="h-44 w-36 mr-2" />
                                </div>
                                <div className="flex flex-col text-start">
                                    <span className="text-gray-700">{producto.nombre}</span>
                                    <p className="text-gray-700">${producto.precio}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;
