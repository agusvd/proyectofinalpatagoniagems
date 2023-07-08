import React from "react";
import { useState, useEffect } from "react";
import aceiteFrontal from "../assets/aceite-frontal.jpeg";
import Humificador from "../assets/humificador.jpeg";
import ProductosDestacados from "../components/ProductosDestacados";
import {BsArrowRightShort, BsArrowLeftShort} from 'react-icons/bs'

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 1 ? 0 : prevIndex + 1));
        }, 13000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="relative font-primary">
            <div className="overflow-hidden relative h-96 m-10 item-center justify-center flex">
                <div
                    className=""
                    style={{ display: currentIndex === 1 ? "block" : "none" }} // Cambiado de 0 a 1
                >
                    <div className="flex-row sm:flex items-center justify-center text-center gap-20">
                        <div className="flex flex-col p-2">
                            <h1 className="text-4xl font-bold">PatagoniaGems</h1>
                            <p className="text-lg font-bold">Tu tienda favorita</p>
                        </div>
                        <img
                            src={aceiteFrontal}
                            className="h-96 w-96 object-center"
                            alt="..."
                        />
                    </div>
                </div>
                <div
                    className="flex justify-center items-center w-full"
                    style={{ display: currentIndex === 0 ? "block" : "none" }} // Cambiado de 1 a 0
                >
                    <div className="flex items-center justify-center">
                        <img src={Humificador} className="h-96 object-center" alt="..." />
                    </div>
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                        PatagoniaGems
                    </h1>
                    <button className="font-bold absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-lg bg-white p-2 rounded-full flex hover:bg-purple-600 hover:text-white">
                        Categorias<BsArrowRightShort size={30} />
                    </button>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between">
                    <button type="button" className="hidden justify-center items-center  cursor-pointer group focus:outline-none text-black active:-translate-x-3 sm:flex sm:ml-32"
                        onClick={handlePrevious}>
                        <BsArrowLeftShort size={40}/>
                    </button>

                    <button type="button" className="justify-center items-center p-2 cursor-pointer group focus:outline-none text-black active:translate-x-3 hidden sm:flex  sm:mr-32"
                        onClick={handleNext}>
                        <BsArrowRightShort size={40}/>
                    </button>
                </div>
                
            </div>
            <div className="bottom-1 transform -translate-y-1/2 w-full flex justify-around bg-gray-200">
                    <button type="button" className="sm:hidden justify-center items-center  cursor-pointer group focus:outline-none text-black active:-translate-x-3 sm:ml-32"
                        onClick={handlePrevious}>
                        <BsArrowLeftShort size={40}/>
                    </button>

                    <button type="button" className="justify-center items-center p-2 cursor-pointer group focus:outline-none text-black active:translate-x-3 sm:hidden  sm:mr-32"
                        onClick={handleNext}>
                        <BsArrowRightShort size={40}/>
                    </button>
                </div>
            <ProductosDestacados />
        </div>
    );
};

export default Home;
