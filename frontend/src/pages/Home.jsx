import React from "react";
import { useState, useEffect } from "react";
import aceiteFrontal from "../assets/aceite-frontal.jpeg";
import Humificador from "../assets/humificador.jpeg";
import ProductosDestacados from "../components/ProductosDestacados";

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
        <div className="relative">
            <div className="flex overflow-hidden relative h-56 sm:h-64 xl:h-80 2xl:h-96">
                <div
                    className="duration-3s ease-in-out transition-all flex justify-center items-center"
                    style={{ display: currentIndex === 0 ? "block" : "none" }}
                >
                    <img
                        src={aceiteFrontal}
                        className="block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full object-center"
                        alt="..."
                    />
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                        PatagoniaGems
                    </h1>
                    <p className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                        En Construccion
                    </p>
                </div>

                <div
                    className="duration-100 ease-in-out transition-all flex justify-center items-center"
                    style={{ display: currentIndex === 1 ? "block" : "none" }}
                >
                    <img
                        src={Humificador}
                        className="block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full object-center"
                        alt="..."
                    />
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                        PatagoniaGems
                    </h1>
                    <p className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                        Categorias
                    </p>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between">
                    <button
                        type="button"
                        className="flex justify-center items-center p-2 cursor-pointer group focus:outline-none"
                        onClick={handlePrevious}
                    >
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none">
                            <svg
                                className="w-5 h-5 text-white dark:text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                ></path>
                            </svg>
                        </span>
                    </button>

                    <button
                        type="button"
                        className="flex justify-center items-center p-2 cursor-pointer group focus:outline-none"
                        onClick={handleNext}
                    >
                        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none">
                            <svg
                                className="w-5 h-5 text-white dark:text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                ></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <ProductosDestacados />
        </div>
    );
};

export default Home;
