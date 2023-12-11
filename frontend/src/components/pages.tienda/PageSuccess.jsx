import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const PageSuccess = () => {
    const [transactionDetails, setTransactionDetails] = useState(null);

    useEffect(() => {
        // Hacer una solicitud al backend para obtener detalles del pago exitoso
        axios.get("http://localhost:8000/success")
            .then(response => {
                setTransactionDetails(response.data.transactionDetails);
            })
            .catch(error => {
                console.error(error);
                // Manejar errores de manera apropiada
            });
    }, []);

    return (
        <div className='bg-white text-black h-screen w-full font-primary'>
            <div className='flex flex-col justify-center items-center h-full'>


                <h2 className='text-3xl pb-10'>¡Pago exitoso!</h2>
                {transactionDetails && (
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='text-black text-xl'>Tu ID de transacción es: {transactionDetails.transactionId}</p>
                        <p className='text-black text-xl '>Estado de tu transacción: {transactionDetails.paymentStatus}</p>
                    </div>
                )}
                <button className='bg-black text-white rounded-md p-2 active:bg-green-500 duration-300 ease-in-out'>
                    <Link to="/">Volver a la Tienda</Link>
                </button>
            </div>
        </div>
    );

}

export default PageSuccess