import React from 'react';

const Regiones = ({ selectedRegion, handleRegionChange, handleComunaChange, comunas, selectedComuna }) => {

    const regiones = [
        'Región Metropolitana',
        'Región de Arica y Parinacota (XV)',
        'Región de Tarapacá (I)',
        'Región de Antofagasta (II)',
        'Región de Atacama (III)',
        'Región de Coquimbo (IV)',
        'Región de Valparaíso (V)',
        'Region del Libertador General Bernando O´Higgins(VI)',
        'Región del Maule (VII)',
        'Regíon del Ñuble (XVI)',
        'Región del Biobío (VIII)',
        'Región de La Araucania (IX)',
        'Region de Los Ríos (XIV)',
        'Región de Los Lagos (X)',
        'Region de Aysén del General Carlos Ibáñez del Campo (XI)',
        'Región de Magallanes y la Antártica Chilena (XII)'
    ];



    return (
        <div>
            <select id="region" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={selectedRegion} onChange={handleRegionChange}>
                <option value="">Selecciona una región</option>
                {regiones.map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                ))}
            </select>

            {selectedRegion && (
                <div>
                    <select id="comuna" className="text-black mt-1 block w-full rounded-md shadow-sm border-2 focus:border-purple-600 bg-white outline-none sm:text-sm p-2" value={selectedComuna} onChange={handleComunaChange}>
                        <option value="">Selecciona una comuna</option>
                        {comunas.map((comuna) => (
                            <option key={comuna} value={comuna}>
                                {comuna}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Regiones;
