import React from "react";
import { useState, useEffect } from "react";
import aceiteFrontal from "../assets/aceite-frontal.jpeg";
import imagen2 from '../assets/imagen2.jpeg'
import { VscCircle, VscCircleFilled } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import '../index.css'
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
        }, 6000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="font-primary bg-black text-white pt-10 items-center justify-center">
            <div className="overflow-hidden relative h-96] item-center justify-center flex flex-col bg-black">
                <div className={`overflow-hidden relative min-h-md item-center justify-center flex ${currentIndex === 0 ? 'animate-slide-in-from-right' : ''}`} style={{ display: currentIndex === 0 ? "block" : "none" }}>
                    <div className="lex-row sm:flex items-center justify-center text-center gap-20">
                        <div className="flex-row sm:flex items-center justify-center text-center">
                            <div className="flex flex-col">
                                <h1 className="text-4xl font-bold">PatagoniaGems</h1>
                                <p className="text-lg font-bold pt-2 pb-2">Tu tienda favorita</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img src={aceiteFrontal} className="sm:h-96 sm:w-96 object-center rounded-xl" alt="imagen" />
                        </div>
                    </div>
                </div>
                <div className={`overflow-hidden relative min-h-md item-center justify-center flex ${currentIndex === 1 ? 'animate-slide-in-from-left' : ''}`} style={{ display: currentIndex === 1 ? "block" : "none" }}>
                    <div className="flex-row sm:flex items-center justify-center text-center gap-20">
                        <img src={imagen2} className="sm:h-96 sm:w-96 object-center rounded-xl" alt="imagen" />
                        <div className="flex-row sm:flex items-center justify-center text-center">
                            <div className="flex flex-col space-y-4">
                                <h1 className="text-4xl font-bold">PatagoniaGems</h1>
                                <Link to="/tienda" className="text-lg rounded-full bg-purple-500 hover:bg-pink-600 text-white duration-300 transition-all ease-out hover:scale-125">Ir de compras</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="bottom-1 min-w-md flex justify-center p-2">
                <button
                    type="button"
                    className="justify-center items-center cursor-pointer group focus:outline-none text-black"
                    onClick={handlePrevious}>
                    {currentIndex === 0 ? (
                        <VscCircleFilled className="text-white animate-pulse" size={30} />
                    ) : (
                        <VscCircle className="text-white" size={30} />
                    )}
                </button>
                <button
                    type="button"
                    className="justify-center items-center p-2 cursor-pointer group focus:outline-none text-black"
                    onClick={handleNext}>
                    {currentIndex === 1 ? (
                        <VscCircleFilled className="text-white animate-pulse" size={30} />
                    ) : (
                        <VscCircle className="text-white" size={30} />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Home;
