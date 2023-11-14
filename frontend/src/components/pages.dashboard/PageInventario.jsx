import React from 'react';
import TablaInventario from '../c.dashboard/TablaInventario';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';

const PageInventario = () => {
    return (
        <div className="flex flex-col sm:flex sm:flex-row bg-white overflow-auto w-screen font-primary animate-duration-300 animate-fade-down">
            <NormalMenu/>
            <div className="flex-1 bg-white overflow-hidden">
                <MobileMenu/>
                <TablaInventario />
            </div>
        </div>
    );
};

export default PageInventario;
