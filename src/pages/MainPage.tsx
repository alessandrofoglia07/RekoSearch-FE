import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import authAxios from '@/api/authAxios';
import axios from '@/api/axios';
import auth from '@/api/auth';
import { categories, Category } from '@/utils/categories';

interface Image {
    file: File;
    previewUrl: string;
}

const MainPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [image, setImage] = useState<Image | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<Category>('Trending');

    useEffect(() => {
        if (searchParams.has('category') && categories.includes(searchParams.get('category')!)) {
            setCategory(searchParams.get('category') as Category);
        }
        getImages();
    }, [searchParams]);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file) {
                setImage({
                    file,
                    previewUrl: URL.createObjectURL(file)
                });
            }
        }
    };

    const handleSubmit = async () => {
        const user = await auth.getCurrentAuthenticatedUser();
        if (!user) return console.log('User is not authenticated');
        if (!image) return console.log('No image selected');
        try {
            // request pre-signed URL from backend
            const { data } = await authAxios.post('/upload-url', {
                fileName: image.file.name,
                fileType: image.file.type
            });
            const { uploadUrl, imageId } = data;
            await axios.put(uploadUrl, image.file, {
                headers: {
                    'Content-Type': image.file.type
                }
            });
            console.log('Image uploaded successfully:', imageId);
        } catch (err) {
            console.log(err);
        }
    };

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
                <input type='file' onChange={onImageChange} />
                {image && <img src={image.previewUrl} alt='preview' />}
                <button onClick={() => setImage(null)}>Remove</button>
                <button disabled={image == null} onClick={handleSubmit}>
                    Submit
                </button>
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
