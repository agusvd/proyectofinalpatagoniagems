import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';


const CardBlogMini = ({ post }) => {

    const descripcionSanitizada = DOMPurify.sanitize(post.descripcion)

    return (
        <div className='w-[400px] h-[300px] font-primary bg-white shadow-xl rounded-xl'>
            <div className='flex justify-center items-center w-full h-full'>
                <Link to={`/blog/post/${post.id}`}>
                    <div className=''>
                        <div className='text-center p-4'>
                            <p className='text-2xl text-gray-800'>{post.titulo}</p>
                        </div>
                        <div className='text-left text-gray-500 p-4'>
                            <div dangerouslySetInnerHTML={{ __html: descripcionSanitizada }}></div>
                        </div>
                        <div className='text-left py-2 px-4'>
                            <p className='text-gray-500 font-sans text-xs'> -- {post.fechaPublicacion}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CardBlogMini;
