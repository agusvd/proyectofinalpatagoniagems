import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import CategoriasP from '../../components/dashboard/CategoriasP';

const NCategoria = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 h-screen w-full overflow-hidden bg-violet-900 md:bg-black">
                <CategoriasP />
            </div>
        </div>
    );
};

export default NCategoria;
