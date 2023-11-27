import React, { useState, useEffect } from 'react';
import { BiArrowFromLeft } from 'react-icons/bi';
import axios from 'axios';
import CardProductoSearch from '../cards.tienda/CardProductoSearch';

const Search = ({ onClose }) => {
    // Estado para almacenar el texto de búsqueda.
    const [searchText, setSearchText] = useState('');
    // Estado para almacenar los resultados de la búsqueda.
    const [searchResults, setSearchResults] = useState([]);
    // Estado para controlar la página actual de resultados.
    const [currentPage, setCurrentPage] = useState(1);
    // Estado para almacenar el número total de páginas de resultados.
    const [totalPages, setTotalPages] = useState(1);
    // Estado para almacenar las categorías de productos.
    const [categorias, setCategorias] = useState([]);


    /*
     * Función asíncrona para realizar la búsqueda de productos.
     * Actualiza el estado con los resultados de la búsqueda.
     */
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
            setTotalPages(Math.ceil(response.data.length / 20)); // aqui asume que hay 20 productos maximo en una busqueda
            setCurrentPage(1); // Reiniciar la página actual a 1
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };
    // Efecto para cargar las categorías al montar el componente.
    useEffect(() => {
        axios
            .get('http://localhost:8000/dashboard/categorias')
            .then((res) => {
                console.log(res.data);
                setCategorias(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    /**
     * Función para obtener el nombre de una categoría dado su ID.
     * @param {number} categoriaId - ID de la categoría.
     * @returns {string} - Nombre de la categoría.
     */

    const getCategoriaNombre = (categoriaId) => {
        const categoria = categorias.find((c) => c.id === categoriaId);
        return categoria ? categoria.categoria : '';
    };

    // Efecto para realizar la búsqueda al montar el componente.
    useEffect(() => {
        handleSearch();
    }, []);

    // Efecto para realizar la búsqueda en tiempo real al cambiar el texto de búsqueda.
    useEffect(() => {
        handleSearch();
    }, [searchText]);


    /**
    * Maneja el evento de desplazamiento para cargar más resultados al llegar al final de la lista.
    * @param {Object} e - Evento de desplazamiento.
    */
    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight) {
            setCurrentPage((prevPage) => prevPage + 1); // Cargar la siguiente página de resultados
        }
    };

    return (
        <div className="bg-white text-[#202020] absolute right-0 top-0 w-full h-screen z-99 font-primary md:w-2/6">
            <div className="flex-col items-center h-screen overflow-auto">
                <div className="flex items-center justify-between bg-white p-2">
                    <h2 className="text-[#202020] text-2xl">Buscar</h2>
                    <BiArrowFromLeft size={30} className="text-[#202020] cursor-pointer hover:text-purple-500" onClick={onClose} />
                </div>
                <div className='bg-white p-2'>
                    <div className="flex items-center">
                        <input type="text" placeholder="Buscar" className="py-2 px-5 bg-gray-200 text-[#202020] outline-none w-full border-2 rounded-full mx-10" value={searchText} onChange={(e) => setSearchText(e.target.value)}
                            onKeyUp={handleSearch} />
                    </div>
                </div>
                {/* Mostrar los resultados de la búsqueda */}
                <div className='bg-white' onScroll={handleScroll}>
                    {searchText.trim() !== '' &&
                        (
                            <div className='text-center border-t border-b p-2 bg-white'>
                                <h3 className='text-lg font-bold text-[#202020]'>Resultados de la búsqueda</h3>
                            </div>
                        )

                    }
                    <ul className=''>
                        {/* CARD productos de busqueda */}
                        {searchResults.slice(0, currentPage * 20).map((producto) => (
                            <CardProductoSearch key={producto.id} producto={producto} getCategoriaNombre={getCategoriaNombre} onClose={onClose} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;
