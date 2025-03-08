import { searchByUser } from '@/api/searchImages';
import { ShortImageResponse } from '@/types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserPage: React.FC = () => {
    const { username } = useParams();

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<ShortImageResponse[] | null>(null);

    const getImages = async (username: string) => {
        try {
            setLoading(true);
            const images = await searchByUser(username);
            setImages(images);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!username) return; // TODO: handle error

        getImages(username);
    }, [username]);

    return <div>UserPage</div>;
};

export default UserPage;
