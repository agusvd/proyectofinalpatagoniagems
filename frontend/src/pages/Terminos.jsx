import React from 'react'

const Terminos = () => {
    return (
        <div className='h-screen font-primary'>
            <div className='bg-gray-100 p-2'>
                <h1 className="text-2xl text-purple-500 text-center font-bold mt-8 mb-8">Términos & Condiciones</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-4 ">
                <div className='p-8'>
                    <div className='mb-8'>
                        <h2 className='text-xl font-bold mb-4'>Condiciones Generales</h2>
                        <p className='text-justify '>Te damos la bienvenida a la tienda online Patagonia Gems, Al acceder y utilizar  nuestro sitio web aceptas cumplir con estos Términos y Condiciones de uso. Si alguno de estos términos no se ajusta a tus preferencias o necesidades, te invitamos a que nos lo hagas saber. Queremos ofrecerte la mejor experiencia posible y estamos abiertos a considerar tus comentarios y sugerencias.</p>
                    </div>
                    <div className='mb-6'>
                        <h2 className='text-xl font-bold mb-8'>Privacidad Y Seguridad de datos</h2>
                        <p className='text-justify mb-4'>Tu privacidad y seguridad son nuestra máxima prioridad. Valoramos la confianza que depositas en nosotros al proporcionarnos tu información y queremos asegurarte que hemos implementado rigurosas medidas de seguridad para salvaguardarla.</p>
                        <p className='text-justify'>
                            Nos comprometemos a proteger tus datos personales y aseguramos que hemos tomado todas las precauciones necesarias para garantizar su seguridad. Puedes confiar en que tus datos están protegidos y que no serán compartidos con terceros sin tu consentimiento.
                        </p>
                    </div>
                </div>
                <div className='p-8'>
                    <div className='mb-8 '>
                        <h2 className='text-xl font-bold mb-4'>Medios De Pago</h2>
                        <p className='text-justify mb-4'>Hemos seleccionado Mercado pago como nuestro proveedor de servicios de pagos en línea, te ofrecemos una variedad de opciones seguras y convenientes para realizar tus compras en nuestra tienda en línea. Al utilizar este método de pago, puedes beneficiarte de su amplia gama de métodos de pago confiables. Algunas de estas opciones son:</p>
                        <div className='text-justify'>
                            <p className=' first-letter:font-bold'>1.Tarjetas de crédito.</p>
                            <p className='first-letter:font-bold'>2. Tarjetas de débito.</p>
                            <p className='first-letter:font-bold'>3. Transferencias Bancarias.</p>
                            <p className='first-letter:font-bold'>4. Saldo en cuenta de Mercado Pago.</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-xl font-bold mb-4 '>Restricciones Geograficas</p>
                        <p className='text-justify'>Es importante destacar que puede haber ciertas áreas o regiones dentro del país que no estén cubiertas por nuestros servicios de envío. Para determinar si tu ubicación es elegible para el envío, te recomendamos verificar durante el proceso de compra.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Terminos