import React from 'react'
import Footer from '../shared.tienda/Footer'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import NavbarMobile from '../shared.tienda/NavbarMobile'
import BlogPublicados from '../c.blog/BlogPublicados'

const PageBlogInicio = () => {
    return (
        <div>
            <NavbarNormal/>
            <NavbarMobile/>
            <BlogPublicados/>
            <Footer/>
        </div>
    )
}

export default PageBlogInicio