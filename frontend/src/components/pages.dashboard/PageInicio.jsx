import React from 'react';
import HomeAdmin from '../c.dashboard/HomeAdmin';
import NormalMenu from '../shared.dashboard/NormalMenu';
import MobileMenu from '../shared.dashboard/MobileMenu';


const PageInicio = () => {
    return (
        <div className="flex flex-row bg-[#202020] overflow-auto w-screen">
        <NormalMenu />
        <div className="flex-1 h-screen w-full overflow-hidden bg-black sm:mt-0">
            <MobileMenu />
            <HomeAdmin />
        </div>
    </div>
    );
}

export default PageInicio;