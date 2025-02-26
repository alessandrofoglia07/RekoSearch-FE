import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import axios from '@/api/axios';
import { categories, Category } from '@/utils/categories';
import UploadImageButton from '@/components/UploadImageButton';

const MainPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<Category>('Trending');

    useEffect(() => {
        if (searchParams.has('category') && categories.includes(searchParams.get('category')!)) {
            setCategory(searchParams.get('category') as Category);
        }
        getImages();
    }, [searchParams]);

    const getImages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/images/category/${category}`);
            setImages(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <header className='h-20'>
                <Navbar />
            </header>
            <main>
                <div className='mx-auto my-24 max-w-[30rem] rounded-md p-6 shadow-xs sm:p-12 md:max-w-[40rem] md:p-24 lg:max-w-[60rem]'>MainPage</div>
                <UploadImageButton />
                <div>
                    {loading && <p>Loading...</p>}
                    {images.map((image) => (
                        <img key={image} src={image} alt='image' />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MainPage;
