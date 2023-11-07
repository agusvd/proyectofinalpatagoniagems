import React from 'react';
import Sidebar from '../shared.dashboard/Sidebar';
import TablaInventario from '../c.dashboard/TablaInventario';

const PageInventario = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 bg-black overflow-hidden">
                <TablaInventario />
            </div>
        </div>
    );
};

export default PageInventario;
