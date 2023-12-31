import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi'
import axios from 'axios';

const Product = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria_id, setCategoria_id] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [es_destacado, setEs_destacado] = useState('');
    const [imagen, setImagen] = useState('')
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [imagenPreview, setImagenPreview] = useState('')
    const [cantidad_gramos, setCantidad_gramos] = useState('')
    const [cantidad_ml, setCantidad_ml] = useState('')

    useEffect(() => {
        // Obtener las categorías desde el backend al cargar el componente
        axios
            .get('http://localhost:8000/dashboard/categorias')
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/dashboard/search/' + id)
            .then(res => {
                setNombre(res.data[0].nombre);
                setDescripcion(res.data[0].descripcion);
                setCategoria_id(res.data[0].categoria_id);
                setCantidad_gramos(res.data[0].cantidad_gramos);
                setCantidad_ml(res.data[0].cantidad_ml);
                setPrecio(res.data[0].precio);
                setStock(res.data[0].stock);
                setEs_destacado(res.data[0].es_destacado)
                setImagen(res.data[0].imagen)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleUpdate(event) {
        event.preventDefault();
        const updatedData = { nombre, categoria_id, cantidad_gramos, cantidad_ml, stock, descripcion, imagen,  precio, es_destacado };
        axios.put('http://localhost:8000/dashboard/actualizar/' + id, updatedData)
            .then(res => {
                console.log(res);
                navigate('/dashboard/inventario');
            })
            .catch(error => {
                console.log(error);
            });
    }


    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    const handleImagenChange = (e) => {
        const imageUrl = e.target.value;
        setImagen(imageUrl);
    };

    const seeImagePreview = () => {
        setImagenPreview(imagen);
    };

    return (
        <div className="h-screen w-full overflow-auto bg-white font-primary">
            <form className="flex flex-col" onSubmit={handleUpdate}>
                <h2 className='text-4xl text-black font-semibold leading-none text-center pt-10 flex justify-center  gap-2'>Actualizando <p className='text-purple-800'>{nombre}</p></h2>
                <div className='flex flex-col justify-center items-center'>
                    <div className='bg-purple-800 text-white p-2 rounded-xl w-[600px] text-center relative top-20 z-[99]'>
                        <div className='flex gap-2 justify-around text-justify'>
                            {step === 1 && (
                                <>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircleMarked size={30} className='animate-pulse duration-75' />
                                        <a className='text-sm'>Informacion</a>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircle size={30} />
                                        <a className='text-sm'>Imagen</a>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircle size={30} />
                                        <a className='text-sm'>Precio</a>
                                    </div>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircleMarked size={30} />
                                        <a className='text-sm'>Informacion</a>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircleMarked size={30} className='animate-pulse duration-75' />
                                        <a className='text-sm'>Imagen</a>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircle size={30} />
                                        <a className='text-sm'>Precio</a>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircleMarked size={30} />
                                        <a className='text-sm'>Informacion</a>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircleMarked size={30} />
                                        <a className='text-sm'>Imagen</a>
                                    </div>
                                    <div className='flex flex-col justify-center items-center'>
                                        <BiRadioCircleMarked size={30} className='animate-pulse duration-75' />
                                        <a className='text-sm'>Precio</a>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    {/* pasos para subir un producto */}
                    <div className='w-[700px] pt-10 rounded-xl p-2'>
                        {step === 1 && (
                            <div className='rounded-md shadow-md pt-10 bg-gray-200 p-2'>
                                <div className='flex flex-col justify-center items-center'>
                                    <h2 className='text-xl text-black pb-4 px-1 font-bold w-full pt-10'>Informacion del producto</h2>
                                    <input required className="w-full rounded-md p-2 mb-2 text-black bg-white  outline-purple-500" type="text" placeholder="Nombre" value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />
                                    <div className='w-full flex gap-2'>
                                        <select required className="w-full rounded-md p-2 mb-2 text-black bg-white  outline-purple-500" value={categoria_id} onChange={(e) => setCategoria_id(e.target.value)}>
                                            <option value="">Seleccione una categoría</option>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.categoria}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='w-full flex gap-2'>
                                        <input className="w-full rounded-md p-2 mb-2 text-black bg-white  outline-purple-500" type="number" placeholder="Cantidad Gramos" value={cantidad_gramos}
                                            onChange={(e) => setCantidad_gramos(e.target.value)} />
                                        <input className="w-full rounded-md p-2 mb-2 text-black bg-white  outline-purple-500" type="number" placeholder="Cantidad Mililitros" value={cantidad_ml}
                                            onChange={(e) => setCantidad_ml(e.target.value)} />
                                    </div>
                                    <input required className="w-full rounded-md p-2 mb-2 text-black bg-white  outline-purple-500" type="number" placeholder="Stock" value={stock}
                                        onChange={(e) => setStock(e.target.value)} />
                                    <textarea required className="w-full rounded-md p-2 mb-2 text-black bg-white  outline-purple-500" type="text" placeholder="Descripción" value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                                <div className='flex justify-end p-2'>
                                    <button className='bg-purple-800 text-white shadow-md hover:bg-black duration-300 active:bg-green-500 transition-all ease-in-out p-2 rounded-md' onClick={nextStep}>
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className='rounded-md shadow-md pt-10 bg-gray-200 p-2'>
                                <h2 className='text-xl text-black pb-4 px-1 font-bold pt-10'>Imagen del producto</h2>
                                <div className='grid grid-cols-1 p-2'>
                                    <label className="py-2 block text-gray-600 font-bold">Link de la imagen</label>
                                    <input required className="p-2 mb-2 text-black bg-white rounded-md shadow-md outline-purple-500" type="text" placeholder="url" value={imagen}
                                        onChange={handleImagenChange} />
                                    <a onClick={seeImagePreview} className="bg-purple-800 text-white px-4 py-2 rounded-md shadow-md mt-2 hover:bg-black hover:text-white duration-300 transition-all ease-in-out cursor-pointer text-center">
                                        Cargar Vista Previa
                                    </a>
                                </div>

                                {imagenPreview && (
                                    <div className='justify-center flex items-center flex-col'>
                                        <h3 className='font-bold'>Imagen previa</h3>
                                        <img
                                            src={imagenPreview}
                                            alt="Vista previa de la imagen"
                                            style={{ maxWidth: '100%', maxHeight: '300px' }}
                                        />

                                    </div>
                                )}
                                <div className='flex justify-between p-2'>
                                    <button className='bg-purple-800 text-white shadow-md hover:bg-black duration-300 active:bg-green-500 transition-all ease-in-out p-2 rounded-md' onClick={prevStep}>
                                        Volver
                                    </button>
                                    <button className='bg-purple-800 text-white shadow-md hover:bg-black duration-300 active:bg-green-500 transition-all ease-in-out p-2 rounded-md' onClick={nextStep}>
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className='rounded-md shadow-md pt-10 bg-gray-200 p-2'>
                                <h2 className='text-xl text-black pb-4 px-1 font-bold pt-10'>Precio</h2>
                                <div className='grid p-2 items-center gap-2'>
                                    <input required className="p-2 text-black bg-white rounded-md shadow-md outline-purple-500" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                    <select className="p-2 mb-2 text-black bg-white rounded-md shadowmd outline-purple-500" value={es_destacado}
                                        onChange={(e) => setEs_destacado(e.target.value)}>
                                        <option value="">¿Es destacado?</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <button className='bg-purple-800 text-white shadow-md hover:bg-black duration-300 active:bg-green-500 transition-all ease-in-out p-2 rounded-md' onClick={prevStep}>
                                        Volver
                                    </button>
                                    <button className='bg-purple-800 text-white shadow-md hover:bg-black duration-300 active:bg-green-500 transition-all ease-in-out p-2 rounded-md' type='submit'>
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Product
