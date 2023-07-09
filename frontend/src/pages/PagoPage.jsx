import React, { useState } from 'react';
import Regiones from '../components/Regiones';

const PagoPage = () => {
    // Definición de los estados utilizando el hook useState
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [shippingMethod, setShippingMethod] = useState('');
    const [address, setAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [saveInfo, setSaveInfo] = useState(false);
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

    // Objeto que contiene las comunas por región
    const comunasPorRegion = {
        'Región Metropolitana': ['Cerrillos', 'La Reina', 'Pudahuel','Cerro Navia','Las Condes','Quilicura','Conchalí','Lo Barnechea','Quinta Normal',
        'El Bosque','Lo Espejo','Recoleta','Estación Central','Lo Prado','Renca','Huechuraba','Macul','San Miguel','Independencia','Maipú','San Joaquín',
        'La Cisterna', 'Ñuñoa','San Ramón','La Florida', 'Pedro Aguirre Cerda', 'Santiago (Centro)', 'La Pintana', 'Peñalolén', 'Vitacura', 'La Granja',
        'Providencia'],

        'Región de Arica y Parinacota (XV)': ['Arica', 'Camarones', 'General Lagos','Putre'],

        'Región de Tarapacá (I)':['Camiña', 'Colchane', 'Huara','Iquique', 'Pica','Pozo Almonte', 'Alto Hospicio'],

        'Región de Antofagasta (II)':['Antofagasta','Calama','María Elena','Mejillones','Ollagüe','San Pedro De Atacama','Sierra Gorda','Taltal','Tocopilla'],

        'Región de Atacama (III)':['Alto Del Carmen','Caldera','Chañaral','Copiapó','Diego De Almagro','Freirina','Huasco','Tierra Amarilla','Vallenar'],

        'Región de Coquimbo (IV)':['Andacollo','Canela','Caleta Hornos','Combarbalá','Coquimbo','Guanaqueros','Illapel','La Higuera','La Serena','Las Tacas','Los Vilos',
        'Monte Patria','Morrillos','Ovalle','Paihuano','Playa Blanca','Puerto Velero','Punitaqui','Río Hurtado','Salamanca','Toncoy','Totoralillo','Vicuña'],

        'Región de Valparaíso (V)':['Algarrobo','Cabildo','Calle Larga','Cartagena','Casablanca','Catemu','Concón','El Quisco','El Tabo','Hijuelas','Isla De Pascua','Juan Fernández','La Calera',
        'La Cruz','La Ligua','Limache','Llay-Llay','Los Angeles','Nogales','Olmué','Panquehue','Papudo','Petorca','Puchuncaví','Putaendo','Quillota','Quilpué','Quintero','Rinconada','San Antonio',
        'San Esteban','San Felipe','Santa María','Santo Domingo','Valparaíso','Villa Alemana','Viña Del Mar','Zapallar'],

        'Region del Libertador General Bernando O´Higgins(VI)':['Chépica','Chimbarongo','Codegua','Coinco','Coltauco','Doñihue','Graneros','La Estrella','Lago Rapel',
        'Las Cabras','Litueche','Lolol','Machalí','Malloa','Marchigüe','Mostazal','Nancagua','Navidad','Olivar','Palmilla','Paredones','Peralillo','Peumo','Pichidegua',
        'Pichilemu','Placilla','Pumanque','Quinta De Tilcoco','Rancagua','Rengo','Requinoa','San Fernando','San Vicente','Santa Cruz'],

        'Región del Maule (VII)':['Cauquenes','Chanco','Colbún','Constitución','Curepto','Curicó','Empedrado','Hualañe','Lincantén','Linares','Longaví','Maule','Molina',
        'Parral','Pelarco','Pelluhue','Pencahue','Rauco','Retiro','Río Claro','Romeral','Sagrada Familia','San Clemente','San Javier','San Rafael','Talca','Teno','Vichuquén','Villa Alegre','Yerbas Buenas'],

        'Regíon del Ñuble (XVI)':['Bulnes','Chillán','Chillán Viejo','Cobquecura','Coelemu','El Carmen','Ninhue','Ñiquén','Pemuco','Pinto','Portezuelo','Quillón','Quirihue','Ranquil','San Carlos','San Fabián',
        'San Ignacio','San Nicolás','Treguaco','Yungay'],

        'Región del Biobío (VIII)':['Alto Biobío','Antuco','Arauco','Cabrero','Cañete','Chiguayante','Concepción','Contulmo','Coronel','Curanilahue','Dichato','Florida','Hualpén','Hualqui','Laja','Lebu','Lirquen','Los Alamos',
        'Los Ángeles','Lota','Mulchén','Nacimiento','Negrete','Penco','Pingueral','Quilaco','Quilleco','Recinto','San Pedro De La Paz','San Rosendo','Santa Bárbara','Santa Juana','Talcahuano','Tirúa','Tomé','Tucapel','Yumbel'],

        'Región de La Araucania (IX)':['Angol','Caburga','Calafquen','Carahue','Cholchol','Collipulli','Corralco','Cunco','Curacautín','Curarrehue','Ercilla','Freire','Galvarino','Gorbea','Lago Cólico','Lago Cólico Norte','Lago Cólico Sur',
        'Lautaro','Lincanray','Loncoche','Lonquimay','Los Sauces','Lumaco','Malalcahuello','Melipeuco','Nueva Imperial','Padre Las Casas','Perquenco','Pitrufquén','Pucón','Puerto Saavedra','Purén',
        'Renaico','Temuco','Teodoro Schmidt','Toltén','Traiguén','Victoria','Vilcún','Villarrica'],

        'Region de Los Ríos (XIV)':['Coñaripe','Corral','Futrono','La Union','Lago Ranco','Lanco','Los Lagos','Mafil','Mariquina','Paillaco','Panquipulli','Rio Bueno','Valdivia'],

        'Región de Los Lagos (X)':['Ancud','Calbuco','Castro','Chaitén','Chonchi','Cochamó','Curaco De Vélez','Dalcahue','El Islote','Ensenada','Fresia','Frutillar','Futaleufú','Hualaihué','Llanquihue','Los Muermos','Marina Rupanco','Maullín','Osorno',
        'Palena','Puerto Montt','Puerto Octay','Puerto Varas','Puqueldón','Purranque','Puyehue','Queilén','Quellón','Quemchi','Quinchao', 'Río Negro','San Juan De la Costa','San Pablo'],

        'Region de Aysén del General Carlos Ibáñez del Campo (XI)':['Aysén','Chile Chico','Cisnes','Cochrane','Coyhaique','Guaitecas','Lago Verde','0´Higgins','Río Ibáñez','Tortel'],

        'Región de Magallanes y la Antártica Chilena (XII)':['Antártica','Cabo De Hornos','Laguna Blanca','Porvenir','Primavera','Puerto Natales','Punta Arenas','Río Verde','San Gregorio','Timaukel','Torres Del Paine']



    };

    return (
        <div className='h-auto p-5 flex justify-center  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-primary'>
            <div className="flex justify-center items-center h-screen">
                <div className=" bg-white h-full justify-center items-center flex flex-col sm:h-auto sm:block p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Datos Personales</h2>
                    <div className="space-y-4">
                        {/* Campos de entrada para el email y el teléfono */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm p-2"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Teléfono
                            </label>
                            <input
                                id="phone"
                                type="text"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm p-2"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        {/* Checkbox para suscripción a ofertas */}
                        <div className="flex items-center">
                            <input
                                id="subscribe"
                                type="checkbox"
                                className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-500 border-gray-300 rounded"
                                checked={subscribe}
                                onChange={handleSubscribeChange}
                            />
                            <label htmlFor="subscribe" className="text-sm font-medium text-gray-700">
                                Recibir nuevas ofertas
                            </label>
                        </div>
                        {/* Selección del método de envío */}
                        <h2 className="text-2xl font-semibold mb-4">Método de envío</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="shipping"
                                    type="radio"
                                    value="envio"
                                    className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-500 border-gray-300 rounded"
                                    checked={shippingMethod === 'envio'}
                                    onChange={handleShippingMethodChange}
                                />
                                <label htmlFor="shipping" className="text-sm font-medium text-gray-700">
                                    Envío
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="pickup"
                                    type="radio"
                                    value="retiro"
                                    className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-500 border-gray-300 rounded"
                                    checked={shippingMethod === 'retiro'}
                                    onChange={handleShippingMethodChange}
                                />
                                <label htmlFor="pickup" className="text-sm font-medium text-gray-700">
                                    Retiro
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
                                        <div>
                                            <Regiones
                                                selectedRegion={selectedRegion}
                                                handleRegionChange={handleRegionChange}
                                                handleComunaChange={handleComunaChange}
                                                comunas={comunas}
                                                selectedComuna={selectedComuna} // Agrega esta línea
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                                Código Postal
                                            </label>
                                            <input
                                                id="postalCode"
                                                type="text"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                                value={postalCode}
                                                onChange={handlePostalCodeChange}
                                            />
                                        </div>
                                    </div>
                                    {/* Campos de entrada para el nombre, apellido, dirección, etc. */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                            Nombre
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            value={firstName}
                                            onChange={handleFirstNameChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                            Apellido
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            value={lastName}
                                            onChange={handleLastNameChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Dirección
                                        </label>
                                        <input
                                            id="address"
                                            type="text"
                                            className="mt-1 block w-full border-gray-300 roundedMis-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            value={address}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="addressLine" className="block text-sm font-medium text-gray-700">
                                            Casa, Dpto, etc.
                                        </label>
                                        <input
                                            id="addressLine"
                                            type="text"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                            value={addressLine}
                                            onChange={handleAddressLineChange}
                                        />
                                    </div>
                                    
                                    {/* Checkbox para guardar información para futuras compras */}
                                    <div className="flex items-center">
                                        <input
                                            id="saveInfo"
                                            type="checkbox"
                                            className="mr-2 focus:ring-purple-500 h-4 w-4 text-purple-700 border-gray-300 rounded"
                                            checked={saveInfo}
                                            onChange={handleSaveInfoChange}
                                        />
                                        <label htmlFor="saveInfo" className="text-sm font-medium text-gray-700">
                                            Guardar esta información para futuras compras
                                        </label>
                                    </div>
                                </div>
                                
                            </div>
                        )}
                        {/* Botones para volver al carrito y continuar al pago */}
                        <div className="flex justify-around  flex-col gap-2 sm:flex-row">
                            <button className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                                Volver al carrito
                            </button>
                            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                Continuar al pago
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagoPage;


