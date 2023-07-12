import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('')
    const [stock, setStock] = useState('');
    const [categoria_id, setCategoria_id] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [es_destacado, setEs_destacado] = useState(''); // o useState(undefined)

    const navigate = useNavigate();

    useEffect(() => {
        // Obtener las categorías desde el backend al cargar el componente
        axios.get('http://localhost:8000/categorias')
            .then(res => {
                setCategorias(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/dashboard/search/' + id)
            .then(res => {
                setNombre(res.data[0].nombre);
                setDescripcion(res.data[0].descripcion);
                setPrecio(res.data[0].precio);
                setStock(res.data[0].stock);
                setCategoria_id(res.data[0].categoria_id);
                setEs_destacado(res.data[0].es_destacado)
                setImagen(res.data[0].imagen)
            })
            .catch(error => {
                console.log(error);
                // Manejar el error aquí
            });
    }, []);
    function handleUpdate(event) {
        event.preventDefault();
        const updatedData = { nombre, descripcion, precio, stock, categoria_id, es_destacado, imagen };
        axios.put('http://localhost:8000/dashboard/actualizar/' + id, updatedData)
            .then(res => {
                console.log(res);
                navigate('/dashboard/inventario');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="h-screen font-primary justify-center items-center flex flex-col overflow-auto bg-violet-950">
            <h2 className="text-center text-3xl text-white pt-5 md:pt-0">Actualizando producto</h2>
            <form className="flex flex-col justify-between border-2 p-2 w-full md:w-1/2 overflow-auto rounded-xl" onSubmit={handleUpdate}>
                <table className='grid sm:grid-cols-2 gap-4'>
                    <div>
                        <label className="block mb-2 text-white">Nombre producto</label>
                        <input required className="w-full p-2 mb-2 text-white outline-none rounded-md bg-violet-800" type="text" placeholder="Nombre" value={nombre}
                            onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-2'>
                        <div>
                            <label className="block mb-2 text-white">Categoría</label>
                            <select required className="w-full p-2 mb-2 text-white outline-none rounded-md bg-violet-800" value={categoria_id} onChange={(e) => setCategoria_id(e.target.value)}>
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='sm:col-span-2'>
                        <label className="block mb-2 text-white">Descripción</label>
                        <textarea required className="w-full text-sm text-white outline-none rounded-md bg-violet-800" type="text" placeholder="Descripción" value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-2'>
                        <div>
                            <label className="block mb-2 text-white">Precio</label>
                            <input required className="w-full p-2 mb-2 text-white outline-none rounded-md bg-violet-800" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        </div>
                        <div>
                            <label className="block mb-2 text-white">Stock</label>
                            <input required className="w-full p-2 mb-2 text-white outline-none rounded-md bg-violet-800" type="number" placeholder="Stock" value={stock}
                                onChange={(e) => setStock(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-white">¿Es destacado?</label>
                        <select className="w-full p-2 mb-2 text-white outline-none rounded-md bg-violet-800" value={es_destacado}
                            onChange={(e) => setEs_destacado(e.target.value)}>
                            <option value="">Seleccione una opción</option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-white">Link de la imagen</label>
                        <input required className="w-full p-2 mb-2 text-white outline-none rounded-md bg-violet-800" type="text" placeholder="Link de la imagen" value={imagen}
                            onChange={(e) => setImagen(e.target.value)} />
                    </div>
                </table>
                <div>
                    <button className="w-full py-2 mb-2 font-bold text-white bg-purple-600 rounded-lg focus:outline-none hover:bg-green-500 duration-300 transition-all" type="submit">
                        GUARDAR
                    </button>
                </div>
            </form>
            <div className="text-center p-2">
                <Link to="/dashboard/inventario" className="text-md text-white hover:text-pink-500 duration-300 transition-all">
                    Ver productos
                </Link>
            </div>
        </div>
    );
}

export default Update