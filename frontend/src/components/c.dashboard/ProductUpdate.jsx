import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
        <div className="flex flex-col rounded-xl">
            <form className="flex flex-col p-2" onSubmit={handleUpdate}>
                <h2 className='text-4xl text-white font-extrabold leading-none text-center'>Actualizando {nombre}</h2>
                <div className='flex justify-center items-center'>
                    <div className='w-[800px] bg-[#202020] pt-10 rounded-xl p-2'>
                        {step === 1 && (
                            <div className='border-2 rounded-xl bg-white pb-10'>
                                <h2 className='text-2xl text-black pb-4 p-2 font-bold'>Informacion del producto</h2>
                                <div className='grid grid-cols-2 gap-10'>
                                    <input required className="w-full p-2 mb-2 text-black bg-white border-gray-300 outline-none border-b-2" type="text" placeholder="Nombre" value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />
                                    <select required className="w-full p-2 mb-2 text-gray-500 bg-white border-gray-300 outline-none border-b-2" value={categoria_id} onChange={(e) => setCategoria_id(e.target.value)}>
                                        <option value="">Seleccione una categoría</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.categoria}
                                            </option>
                                        ))}
                                    </select>
                                    <textarea required className="text-black bg-white border-gray-300 outline-none border-b-2 mb-2 p-2" type="text" placeholder="Descripción" value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)} />
                                    <input required className="p-2 mb-2 text-black bg-white border-gray-300 outline-none border-b-2" type="number" placeholder="Stock" value={stock}
                                        onChange={(e) => setStock(e.target.value)} />
                                </div>
                                <div className='flex justify-end p-2'>
                                    <button className='bg-purple-800 text-white hover:bg-black duration-100 transition-all ease-in-out p-2 rounded-xl' onClick={nextStep}>
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className='bg-white rounded-xl pb-10'>
                                <h2 className='text-2xl text-black pb-4 p-2 font-bold'>Imagen del producto</h2>
                                <div className='grid grid-cols-1 p-2'>
                                    <label className="p-2 block text-black font-bold">Link de la imagen</label>
                                    <input required className=" p-2 mb-2 text-black bg-white border-gray-300 outline-none border-b-2" type="text" placeholder="url" value={imagen}
                                        onChange={handleImagenChange} />
                                    <a onClick={seeImagePreview} className="bg-purple-800 text-white px-4 py-2 rounded-xl mt-2 hover:bg-black hover:text-white duration-100 transition-all ease-in-out cursor-pointer text-center">
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
                                    <button className='bg-purple-800 text-white hover:bg-black duration-100 transition-all ease-in-out p-2 rounded-xl' onClick={prevStep}>
                                        Volver
                                    </button>
                                    <button className='bg-purple-800 text-white hover:bg-black duration-100 transition-all ease-in-out p-2 rounded-xl' onClick={nextStep}>
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className='bg-white rounded-xl pb-10'>
                                <h2 className='text-3xl text-black pb-4 p-2 font-bold'>Precio</h2>
                                <div className='grid p-2 items-center gap-10'>
                                    <input required className="p-2 text-black bg-white border-gray-300 outline-none border-b-2" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                    <select className="p-2 mb-2 text-black bg-white border-gray-300 outline-none border-b-2" value={es_destacado}
                                        onChange={(e) => setEs_destacado(e.target.value)}>
                                        <option value="">¿Es destacado?</option>
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className='flex justify-between p-2'>
                                    <button className='bg-purple-800 text-white hover:bg-black duration-100 transition-all ease-in-out p-2 rounded-xl' onClick={prevStep}>
                                        Volver
                                    </button>
                                    <button className='bg-purple-800 text-white hover:bg-green-500 duration-100 transition-all ease-in-out p-2 rounded-xl' type='submit'>
                                        Guardar producto
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='bg-purple-800 text-white p-2 rounded-xl w-[600px] text-center relative bottom-10 z-[99]'>
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
            </form>

        </div>
    );
};

export default Product
