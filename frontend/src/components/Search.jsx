import React from 'react'
import { BiArrowFromLeft } from 'react-icons/bi';

const Search = ({ onClose }) => {
    return (
        <div className="bg-gray-200 text-white p-4 absolute right-0 top-0 w-3/4 h-screen z-99 font-primary md:w-2/6">
            <div className='flex-col items-center'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-black mr-4 text-xl'>Buscar</h2>
                    <BiArrowFromLeft
                        size={30}
                        className="text-black cursor-pointer hover:text-purple-500"
                        onClick={onClose}
                    />
                </div>
                <br></br>
                <ul>
                    <li className='border-t border-black pt-2 pb-2 '></li>
                </ul>
                <br></br>
                <div className="w-full">
                    <div className="flex items-center ">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="py-2 px-5 bg-white rounded-md text-black outline-none w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search