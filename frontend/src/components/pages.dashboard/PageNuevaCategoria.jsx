import React from 'react';
import Sidebar from '../shared.dashboard/Sidebar';
import CategoriasP from '../c.dashboard/CategoriasP';

const PageNuevaCategoria = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 w-full overflow-hidden bg-black">
                <CategoriasP />
            </div>
        </div>
    );
};

export default PageNuevaCategoria;
