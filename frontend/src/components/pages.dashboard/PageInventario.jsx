import React from 'react';
import TablaInventario from '../c.dashboard/TablaInventario';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';

const PageInventario = () => {
    return (
        <div className="flex flex-col sm:flex sm:flex-row bg-[#202020] overflow-auto w-screen">
            <NormalMenu/>
            <div className="flex-1 bg-[#202020] overflow-hidden">
                <MobileMenu/>
                <TablaInventario />
            </div>
        </div>
    );
};

export default PageInventario;
