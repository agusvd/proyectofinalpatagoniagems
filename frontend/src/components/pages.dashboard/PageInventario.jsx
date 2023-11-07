import React from 'react';
import TablaInventario from '../c.dashboard/TablaInventario';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';

const PageInventario = () => {
    return (
        <div className="flex flex-col sm:flex sm:flex-row bg-black overflow-auto w-screen">
            <NormalMenu/>
            <div className="flex-1 bg-black overflow-hidden">
                <MobileMenu/>
                <TablaInventario />
            </div>
        </div>
    );
};

export default PageInventario;
