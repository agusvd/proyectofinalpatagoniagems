import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria_id, setCategoria_id] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [es_destacado, setEs_destacado] = useState('');
    const [imagen, setImagen] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener las categorías desde el backend al cargar el componente
        axios
            .get('http://localhost:8000/categorias')
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:8000/dashboard/inventario/agregar', {
                nombre,
                descripcion,
                precio,
                stock,
                categoria_id,
                es_destacado,
                imagen,
            })
            .then((res) => {
                console.log(res);
                navigate('/dashboard/inventario');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex flex-col m-4 md:m-4 bg-[#202020] rounded-md">
            <form className="flex flex-col justify-between overflow-auto p-2" onSubmit={handleSubmit}>
                <h2 className="text-center text-3xl text-white pt-5 md:pt-0">Nuevo Producto</h2>
                <table className='grid sm:grid-cols-2 gap-4'>
                    <div>
                        <label className="block mb-2 text-white">Nombre producto</label>
                        <input required className="w-full p-2 mb-2 text-black outline-none rounded-md" type="text" placeholder="Nombre" value={nombre}
                            onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-2'>
                        <div>
                            <label className="block mb-2 text-white">Categoría</label>
                            <select required className="w-full p-2 mb-2 text-black outline-none rounded-md" value={categoria_id} onChange={(e) => setCategoria_id(e.target.value)}>
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className=''>
                        <label className="block mb-2 text-white">Descripción</label>
                        <textarea required className="w-full text-sm text-black outline-none rounded-md " type="text" placeholder="Descripción" value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <div>
                            <label className="block mb-2 text-white">Precio</label>
                            <input required className="w-full p-2 mb-2 text-black outline-none rounded-md" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        </div>
                        <div>
                            <label className="block mb-2 text-white">Stock</label>
                            <input required className="w-full p-2 mb-2 text-black outline-none rounded-md" type="number" placeholder="Stock" value={stock}
                                onChange={(e) => setStock(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-white">¿Es destacado?</label>
                        <select className="w-full p-2 mb-2 text-black outline-none rounded-md" value={es_destacado}
                            onChange={(e) => setEs_destacado(e.target.value)}>
                            <option value="">Seleccione una opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-white">Link de la imagen</label>
                        <input required className="w-full p-2 mb-2 text-black outline-none rounded-md" type="text" placeholder="Nombre" value={imagen}
                            onChange={(e) => setImagen(e.target.value)} />
                    </div>
                </table>
                <div className='flex justify-between'>
                    <div className="text-center p-2">
                        <Link to="/dashboard/inventario" className="text-md text-white hover:text-pink-500 duration-300 transition-all">
                            Ver productos
                        </Link>
                    </div>
                    <button className="w-[100px] py-2 mb-2 font-bold text-white bg-purple-600 rounded-lg focus:outline-none hover:bg-green-500 duration-300 transition-all" type="submit">
                        GUARDAR
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Product
