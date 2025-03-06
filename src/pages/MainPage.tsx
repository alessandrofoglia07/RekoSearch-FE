import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { categories, Category } from '@/utils/categories';
import UploadImageButton from '@/components/UploadImageButton';
import CategorySelector from '@/components/CategorySelector';
import useDebounce from '@/hooks/useDebounce';
import { ShortImageResponse } from '@/types';
import { searchByCategory, searchByLabel } from '@/api/searchImages';

const MainPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    const [images, setImages] = useState<ShortImageResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<Category>('Trending');
    const [search, setSearch] = useState('');

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (searchParams.has('category') && categories.includes(searchParams.get('category')!)) {
            setCategory(searchParams.get('category') as Category);
        }
    }, [searchParams]);

    useEffect(() => {
        searchImages();
    }, [debouncedSearch]);

    useEffect(() => {
        getImages();
    }, [category]);

    const getImages = async () => {
        try {
            setLoading(true);
            const images = await searchByCategory(category, true);
            setImages(images);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const searchImages = async () => {
        try {
            setLoading(true);
            const images = await searchByLabel(search, true);
            setImages(images);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <header className='h-20'>
                <Navbar search={search} setSearch={setSearch} />
            </header>
            <main>
                <div className='mx-auto my-24 max-w-[30rem] rounded-md p-6 shadow-xs sm:p-12 md:max-w-[40rem] md:p-24 lg:max-w-[60rem]'>MainPage</div>
                <UploadImageButton />
                <CategorySelector category={category} setCategory={setCategory} />
                <div>
                    {loading && <p>Loading...</p>}
                    {images.map((image) => (
                        <a href={`/image/${image.imageId}`} key={image.imageId}>
                            <img src={image.fileUrl} alt='image' />
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MainPage;
