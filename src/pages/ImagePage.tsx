import axios from '@/api/axios';
import { CompleteImageResponse } from '@/types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ImagePage: React.FC = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<CompleteImageResponse | null>(null);

    const getImageData = async (id: string) => {
        try {
            setLoading(true);
            const res = await axios.get(`/image/${id}`);
            setImage(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return; // TODO: handle error

        getImageData(id);
    }, [id]);

    // TODO: Implement the UI for the ImagePage
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : !image ? (
                <div>Error</div>
            ) : (
                <div>
                    <img src={image.fileUrl} alt={image.imageTitle} />
                    <div>{image.imageTitle}</div>
                    <div>{image.imageDescription}</div>
                    <div>{image.category}</div>
                    <div>{image.labels.join(', ')}</div>
                    <div>
                        {image.views} views | {image.likes} likes
                    </div>
                    <div>
                        <a href={`/user/${image.authorUsername}`}>{image.authorUsername}</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePage;
