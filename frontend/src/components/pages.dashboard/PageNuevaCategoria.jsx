import React from 'react';
import CategoriasP from '../c.dashboard/CategoriasP';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';

const PageNuevaCategoria = () => {
    return (
        <div className="flex flex-col sm:flex sm:flex-row bg-[#202020] overflow-auto w-screen">
            <NormalMenu />
            <div className="flex-1 w-full overflow-hidden bg-[#202020]">
                <MobileMenu />
                <CategoriasP />
            </div>
        </div>
    );
};

export default PageNuevaCategoria;
