import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className='fixed left-0 top-0 z-50 m-4 mb-8 flex h-12 w-[calc(100svw-2rem)] items-center justify-between'>
            <a className='h-full pr-4 md:pr-8' href='/'>
                RekoSearch
            </a>
            <div className='flex h-full items-center md:pr-8 -md:w-3/4'></div>
            <div className='flex h-full w-10 items-center justify-end md:w-[calc(3rem+150px)]'></div>
        </nav>
    );
};

export default Navbar;
