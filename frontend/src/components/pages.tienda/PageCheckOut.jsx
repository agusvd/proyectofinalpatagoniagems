import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Regiones from '../c.tienda/Regiones';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const PageCheckOut = () => {

    // Primero el carrito
    // Estado para almacenar los productos en el carrito
    const [carritoItems, setCarritoItems] = useState([]);

    // Estado para almacenar la cantidad de cada producto en el carrito
    const [cantidadProductos, setCantidadProductos] = useState({});

    // guardamos un valor true si esta logeado
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Efecto para cargar los productos del carrito al montar el componente
    useEffect(() => {
        const fetchCarritoItems = async () => {
            try {
                // Obtener el token del usuario desde las cookies
                const token = Cookies.get('token');
                const decodedToken = jwtDecode(token);
                const usuario_id = decodedToken.id;

                if (token) {
                    setIsLoggedIn(true);
                }

                // Hacer una solicitud al backend para obtener los productos del carrito
                const response = await axios.get(
                    `http://localhost:8000/carrito?usuario_id=${usuario_id}`
                );

                // Actualizar el estado con los productos y la cantidad inicial
                setCarritoItems(response.data);
                const cantidadInicial = {};
                response.data.forEach((item) => {
                    cantidadInicial[item.producto_id] = item.cantidad_total;
                });
                setCantidadProductos(cantidadInicial);
            } catch (error) {
                console.error('Error al obtener los productos del carrito:', error);
            }
        };

        fetchCarritoItems();
    }, []);

    // Función para calcular el precio total de un producto en el carrito
    const calcularPrecioTotal = (producto) => {
        return producto.precio * cantidadProductos[producto.producto_id];
    };

    // Función para calcular el precio total del carrito sumando los precios totales de todos los productos
    const calcularPrecioTotalCarrito = () => {
        let total = 0;
        carritoItems.forEach((item) => {
            total += calcularPrecioTotal(item);
        });
        return total;
    };

    // formulario de envio
    // Definición de los estados utilizando el hook useState
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [shippingMethod, setShippingMethod] = useState('');
    const [address, setAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedComuna, setSelectedComuna] = useState('');
    const [comunas, setComunas] = useState([]);

    // Manejadores de eventos para cambios en los campos de entrada
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubscribeChange = (e) => {
        setSubscribe(e.target.checked);
    };

    const handleShippingMethodChange = (e) => {
        setShippingMethod(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleAddressLineChange = (e) => {
        setAddressLine(e.target.value);
    };

    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
    };
    // Actualiza la región seleccionada y reinicia la comuna seleccionada y la lista de comunas
    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        setSelectedRegion(selectedRegion);
        setSelectedComuna('');
        setComunas(comunasPorRegion[selectedRegion] || []);
    };

    const handleComunaChange = (e) => {
        // Actualiza la comuna seleccionada
        setSelectedComuna(e.target.value);
    };

    const handleSaveInfoChange = (e) => {
        // Actualiza el estado para guardar información para futuras compras
        setSaveInfo(e.target.checked);
    };

    // mercadopago
    const [preferenceId, setPreferenceId] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    initMercadoPago("TEST-9e467044-7573-4752-9e22-6d63cbd13be4")

    const createPreference = async (carritoItems, cantidadProductos) => {
        try {
            const items = carritoItems.map(item => ({
                description: item.nombre, 
                price: item.precio,
                quantity: parseInt(cantidadProductos[item.producto_id], 10), // Asegura que el valor es un entero
                currency_id: "CLP"
            }));

            const response = await axios.post("http://localhost:8000/create_preference", { items });

            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error.response.data);
            toast.error('Error al crear la preferencia');
        }
    };

    const handleBuy = async () => {
        // Verifica si está logeado el usuario
        if (!isLoggedIn) {
            console.log("No está logeado");
            return;
        }
        setIsLoading(true);
        const id = await createPreference(carritoItems, cantidadProductos); // Pasa los argumentos necesarios
        if (id) {
            setPreferenceId(id);
        }
    };

    const comunasPorRegion = {
        'Región Metropolitana': ['Cerrillos', 'La Reina', 'Pudahuel', 'Cerro Navia', 'Las Condes', 'Quilicura', 'Conchalí', 'Lo Barnechea', 'Quinta Normal',
            'El Bosque', 'Lo Espejo', 'Recoleta', 'Estación Central', 'Lo Prado', 'Renca', 'Huechuraba', 'Macul', 'San Miguel', 'Independencia', 'Maipú', 'San Joaquín',
            'La Cisterna', 'Ñuñoa', 'San Ramón', 'La Florida', 'Pedro Aguirre Cerda', 'Santiago (Centro)', 'La Pintana', 'Peñalolén', 'Vitacura', 'La Granja',
            'Providencia'],

        'Región de Arica y Parinacota (XV)': ['Arica', 'Camarones', 'General Lagos', 'Putre'],

        'Región de Tarapacá (I)': ['Camiña', 'Colchane', 'Huara', 'Iquique', 'Pica', 'Pozo Almonte', 'Alto Hospicio'],

        'Región de Antofagasta (II)': ['Antofagasta', 'Calama', 'María Elena', 'Mejillones', 'Ollagüe', 'San Pedro De Atacama', 'Sierra Gorda', 'Taltal', 'Tocopilla'],

        'Región de Atacama (III)': ['Alto Del Carmen', 'Caldera', 'Chañaral', 'Copiapó', 'Diego De Almagro', 'Freirina', 'Huasco', 'Tierra Amarilla', 'Vallenar'],

        'Región de Coquimbo (IV)': ['Andacollo', 'Canela', 'Caleta Hornos', 'Combarbalá', 'Coquimbo', 'Guanaqueros', 'Illapel', 'La Higuera', 'La Serena', 'Las Tacas', 'Los Vilos',
            'Monte Patria', 'Morrillos', 'Ovalle', 'Paihuano', 'Playa Blanca', 'Puerto Velero', 'Punitaqui', 'Río Hurtado', 'Salamanca', 'Toncoy', 'Totoralillo', 'Vicuña'],

        'Región de Valparaíso (V)': ['Algarrobo', 'Cabildo', 'Calle Larga', 'Cartagena', 'Casablanca', 'Catemu', 'Concón', 'El Quisco', 'El Tabo', 'Hijuelas', 'Isla De Pascua', 'Juan Fernández', 'La Calera',
            'La Cruz', 'La Ligua', 'Limache', 'Llay-Llay', 'Los Angeles', 'Nogales', 'Olmué', 'Panquehue', 'Papudo', 'Petorca', 'Puchuncaví', 'Putaendo', 'Quillota', 'Quilpué', 'Quintero', 'Rinconada', 'San Antonio',
            'San Esteban', 'San Felipe', 'Santa María', 'Santo Domingo', 'Valparaíso', 'Villa Alemana', 'Viña Del Mar', 'Zapallar'],

        'Region del Libertador General Bernando O´Higgins(VI)': ['Chépica', 'Chimbarongo', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'La Estrella', 'Lago Rapel',
            'Las Cabras', 'Litueche', 'Lolol', 'Machalí', 'Malloa', 'Marchigüe', 'Mostazal', 'Nancagua', 'Navidad', 'Olivar', 'Palmilla', 'Paredones', 'Peralillo', 'Peumo', 'Pichidegua',
            'Pichilemu', 'Placilla', 'Pumanque', 'Quinta De Tilcoco', 'Rancagua', 'Rengo', 'Requinoa', 'San Fernando', 'San Vicente', 'Santa Cruz'],

        'Región del Maule (VII)': ['Cauquenes', 'Chanco', 'Colbún', 'Constitución', 'Curepto', 'Curicó', 'Empedrado', 'Hualañe', 'Lincantén', 'Linares', 'Longaví', 'Maule', 'Molina',
            'Parral', 'Pelarco', 'Pelluhue', 'Pencahue', 'Rauco', 'Retiro', 'Río Claro', 'Romeral', 'Sagrada Familia', 'San Clemente', 'San Javier', 'San Rafael', 'Talca', 'Teno', 'Vichuquén', 'Villa Alegre', 'Yerbas Buenas'],

        'Regíon del Ñuble (XVI)': ['Bulnes', 'Chillán', 'Chillán Viejo', 'Cobquecura', 'Coelemu', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ranquil', 'San Carlos', 'San Fabián',
            'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'],

        'Región del Biobío (VIII)': ['Alto Biobío', 'Antuco', 'Arauco', 'Cabrero', 'Cañete', 'Chiguayante', 'Concepción', 'Contulmo', 'Coronel', 'Curanilahue', 'Dichato', 'Florida', 'Hualpén', 'Hualqui', 'Laja', 'Lebu', 'Lirquen', 'Los Alamos',
            'Los Ángeles', 'Lota', 'Mulchén', 'Nacimiento', 'Negrete', 'Penco', 'Pingueral', 'Quilaco', 'Quilleco', 'Recinto', 'San Pedro De La Paz', 'San Rosendo', 'Santa Bárbara', 'Santa Juana', 'Talcahuano', 'Tirúa', 'Tomé', 'Tucapel', 'Yumbel'],

        'Región de La Araucania (IX)': ['Angol', 'Caburga', 'Calafquen', 'Carahue', 'Cholchol', 'Collipulli', 'Corralco', 'Cunco', 'Curacautín', 'Curarrehue', 'Ercilla', 'Freire', 'Galvarino', 'Gorbea', 'Lago Cólico', 'Lago Cólico Norte', 'Lago Cólico Sur',
            'Lautaro', 'Lincanray', 'Loncoche', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Malalcahuello', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Puerto Saavedra', 'Purén',
            'Renaico', 'Temuco', 'Teodoro Schmidt', 'Toltén', 'Traiguén', 'Victoria', 'Vilcún', 'Villarrica'],

        'Region de Los Ríos (XIV)': ['Coñaripe', 'Corral', 'Futrono', 'La Union', 'Lago Ranco', 'Lanco', 'Los Lagos', 'Mafil', 'Mariquina', 'Paillaco', 'Panquipulli', 'Rio Bueno', 'Valdivia'],

        'Región de Los Lagos (X)': ['Ancud', 'Calbuco', 'Castro', 'Chaitén', 'Chonchi', 'Cochamó', 'Curaco De Vélez', 'Dalcahue', 'El Islote', 'Ensenada', 'Fresia', 'Frutillar', 'Futaleufú', 'Hualaihué', 'Llanquihue', 'Los Muermos', 'Marina Rupanco', 'Maullín', 'Osorno',
            'Palena', 'Puerto Montt', 'Puerto Octay', 'Puerto Varas', 'Puqueldón', 'Purranque', 'Puyehue', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Río Negro', 'San Juan De la Costa', 'San Pablo'],

        'Region de Aysén del General Carlos Ibáñez del Campo (XI)': ['Aysén', 'Chile Chico', 'Cisnes', 'Cochrane', 'Coyhaique', 'Guaitecas', 'Lago Verde', '0´Higgins', 'Río Ibáñez', 'Tortel'],

        'Región de Magallanes y la Antártica Chilena (XII)': ['Antártica', 'Cabo De Hornos', 'Laguna Blanca', 'Porvenir', 'Primavera', 'Puerto Natales', 'Punta Arenas', 'Río Verde', 'San Gregorio', 'Timaukel', 'Torres Del Paine']
    };

    return (
        <div className='w-full h-screen flex font-primary justify-center items-center'>
            <div className='flex flex-col sm:flex sm:flex-row w-full h-full overflow-hidden'>
                {/* Left side form */}
                <div className='bg-white w-full h-full overflow-auto'>
                <Toaster/>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-black font-bold text-2xl pt-10'>PatagoniaGems</h1>
                        <div className="text-sm breadcrumbs text-black">
                            <ul>
                                <li><Link to='/cart'>Carrito</Link></li>
                                <li><p className='font-bold'>información</p></li>
                                <li><p>Pago</p></li>
                            </ul>
                        </div>
                        {/* formulario */}
                        <div className='w-full h-full overflow-hidden'>
                            <form className=" justify-center items-center flex flex-col sm:h-auto sm:block p-8">
                                <h2 className="text-xl text-black font-semibold mb-4">Contacto</h2>
                                <div className="space-y-4">
                                    {/* Campos de entrada para el email y el teléfono */}
                                    <div>
                                        <input placeholder='Email' id="email" type="email" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={email} onChange={handleEmailChange} />

                                        <input placeholder='Telefono' id="phone" type="text" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={phone} onChange={handlePhoneChange}
                                        />
                                    </div>
                                    {/* Selección del método de envío */}
                                    <h2 className="text-xl text-black font-semibold mb-4">Método de envío</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input id="shipping" type="radio" value="envio" className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-500 border-gray-300 rounded" checked={shippingMethod === 'envio'} onChange={handleShippingMethodChange} />
                                            <label htmlFor="shipping" className="text-sm font-medium text-gray-700">
                                                Envío (Solo Chile)
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="pickup" type="radio" value="retiro" className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-500 border-gray-300 rounded" checked={shippingMethod === 'retiro'} onChange={handleShippingMethodChange} />
                                            <label htmlFor="pickup" className="text-sm font-medium text-gray-700">
                                                Retiro (Solo Punta Arenas)
                                            </label>
                                        </div>
                                    </div>
                                    {/* Sección de dirección de envío */}
                                    {shippingMethod === 'envio' && (
                                        <div className=''>
                                            <h2 className="text-2xl font-semibold mb-4">Dirección de envío</h2>
                                            <div className="space-y-4">
                                                {/* Selección de región y comuna */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className=''>
                                                        <Regiones selectedRegion={selectedRegion} handleRegionChange={handleRegionChange} handleComunaChange={handleComunaChange} comunas={comunas} selectedComuna={selectedComuna} />
                                                    </div>
                                                    <div>
                                                        <input placeholder='Codigo Postal' id="postalCode" type="text" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={postalCode} onChange={handlePostalCodeChange} />
                                                    </div>
                                                </div>
                                                {/* Campos de entrada para el nombre, apellido, dirección, etc. */}
                                                <div>
                                                    <input placeholder='Nombre' id="firstName" type="text" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={firstName} onChange={handleFirstNameChange} />
                                                </div>
                                                <div>
                                                    <input placeholder='Apellido' id="lastName" type="text" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={lastName} onChange={handleLastNameChange} />
                                                </div>
                                                <div>
                                                    <input placeholder='Dirección' id="address" type="text" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={address} onChange={handleAddressChange} />
                                                </div>
                                                <div>
                                                    <input placeholder='Casa, Dpto, etc.' id="addressLine" type="text" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={addressLine}
                                                        onChange={handleAddressLineChange} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                            <div className='pb-5 w-full flex justify-end items-center pr-5'>
                                {isLoading ?
                                    <div className='-mt-4'>
                                        {preferenceId && <Wallet initialization={{ preferenceId }} />}
                                    </div>
                                    :
                                    <button className='p-[25px] bg-black hover:bg-[#474A56]  text-white active:bg-green-500 active:scale-95 duration-300 ease-in-out text-sm font-semibold rounded-md  items-center flex justify-center' onClick={handleBuy}>
                                        <p>Continuar con el pago</p>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right side cart */}
                {/* Contenedor principal */}
                <div className='bg-purple-600 w-full h-full flex justify-start p-10'>
                    {/* Contenedor dos */}
                    <div className='w-full h-full'>
                        <div className='max-h-[70vh] overflow-auto flex flex-col justify-between'>
                            {carritoItems.map((producto) => (
                                <table key={producto} className='w-full h-full'>
                                    <tbody>
                                        <tr className='flex gap-2 pt-5 items-center w-full'>
                                            <td className='indicator p-2 bg-white rounded-xl h-full'>
                                                <div className='w-[60px]'>
                                                    <img src={producto.imagen} alt={`Imagen ${producto.nombre}`} className='w-full h-[60px] object-contain' />
                                                    <span className="badge badge-md indicator-item text-white  w-[20px] h-[20px] bg-black border-none">
                                                        {cantidadProductos[producto.producto_id]}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='w-full h-full flex'>
                                                <h2 className='text-white font-semibold text-md w-full h-full'>
                                                    {producto.nombre}
                                                </h2>
                                            </td>
                                            <td className='w-[200px] h-full'>
                                                <p className='text-white font-semibold text-sm w-full h-full'>
                                                    ${producto.precio * cantidadProductos[producto.producto_id]} CLP
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                        </div>
                        <div className="divider"></div>
                        <div className="flex w-full justify-between sticky">
                            <h1 className="text-white font-semibold">Total</h1>
                            <h2 className="text-white font-semibold">${calcularPrecioTotalCarrito()} CLP</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageCheckOut