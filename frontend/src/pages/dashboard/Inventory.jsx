import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import TablaInventario from '../../components/dashboard/TablaInventario';

const Inventory = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
            <Sidebar />
            <div className="flex-1 bg-violet-900 md:bg-black overflow-hidden">
                <TablaInventario />
            </div>
        </div>
    );
};

export default Inventory;
