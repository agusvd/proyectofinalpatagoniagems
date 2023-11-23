import React from 'react'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import BlogCrud from '../c.blog/BlogCrud'
import Footer from '../shared.tienda/Footer'
import NavMini from '../shared.tienda/NavMini'

const PageBlogNuevo = () => {
    return (
        <div>
            <NavMini/>
            <NavbarNormal/>
            <BlogCrud/>
            <Footer/>
        </div>
    )
}

export default PageBlogNuevo