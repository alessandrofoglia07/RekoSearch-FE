import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

const MainPage: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <div>
            <header className='h-20'>
                <Navbar />
            </header>
            <main>
                <div className='mx-auto my-24 max-w-[30rem] rounded-md p-6 shadow-sm sm:p-12 md:max-w-[40rem] md:p-24 lg:max-w-[60rem]'>MainPage</div>
                <input type='file' onChange={onImageChange} />
                {image && <img src={image} alt='preview' />}
            </main>
        </div>
    );
};

export default MainPage;
