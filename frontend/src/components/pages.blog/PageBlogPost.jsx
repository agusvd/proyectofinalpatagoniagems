import React from 'react'
import NavbarNormal from '../shared.tienda/NavbarNormal'
import Blog from '../c.blog/Blog'
import Footer from '../shared.tienda/Footer'
import NavMini from '../shared.tienda/NavMini'

const PageBlogPost = () => {
    return (
        <div>
            <NavMini/>
            <NavbarNormal/>
            <Blog />
            <Footer/>
        </div>
    )
}

export default PageBlogPost