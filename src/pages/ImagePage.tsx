import axios from '@/api/axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ImagePage: React.FC = () => {
    const { id } = useParams();

    const getImageData = async (id: string) => {
        const { data } = await axios.get(`/image/${id}`);
        return data;
    };

    useEffect(() => {
        if (!id) return; // handle error

        getImageData(id);
    }, [id]);

    return <div>ImagePage</div>;
};

export default ImagePage;
