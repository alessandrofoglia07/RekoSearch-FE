import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import useAuth from '@/hooks/useAuth';
import axios from '@/api/authAxios';

const MainPage: React.FC = () => {
    const { getSession } = useAuth();
    const [image, setImage] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        const session = await getSession();
        if (!session) return console.log('User is not authenticated');
        const formData = new FormData();
        formData.append('image', image!);
        const res = await axios.post('/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(res.data);
    };

    const getImages = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/images');
            setImages(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getImages();
    }, []);

    return (
        <div>
            <header className='h-20'>
                <Navbar />
            </header>
            <main>
                <div className='mx-auto my-24 max-w-[30rem] rounded-md p-6 shadow-sm sm:p-12 md:max-w-[40rem] md:p-24 lg:max-w-[60rem]'>MainPage</div>
                <input type='file' onChange={onImageChange} />
                {image && <img src={image} alt='preview' />}
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
