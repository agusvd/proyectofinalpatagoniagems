import React from 'react';
import Sidebar from '../shared.dashboard/Sidebar';
import HomeAdmin from '../c.dashboard/HomeAdmin';


const PageInicio = () => {
    return (
        <div className="flex flex-row bg-black overflow-auto w-screen">
        <Sidebar />
        <div className="flex-1 h-screen w-full overflow-hidden bg-violet-900 md:bg-black sm:mt-0">
            <HomeAdmin />
        </div>
    </div>
    );
}

export default PageInicio;