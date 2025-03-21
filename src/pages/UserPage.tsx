import axios from '@/api/axios';
import { searchByUser } from '@/api/searchImages';
import { ShortImageResponse, UserData } from '@/types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserPage: React.FC = () => {
    const { username } = useParams();

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<ShortImageResponse[] | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    const getImages = async (username: string) => {
        const images = await searchByUser(username);
        setImages(images);
    };

    const getUserData = async (username: string) => {
        const res = await axios.get(`/users/${username}`);
        setUserData(res.data);
    };

    useEffect(() => {
        if (!username) return; // TODO: handle error

        (async () => {
            try {
                setLoading(true);
                await Promise.all([getImages(username), getUserData(username)]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [username]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : !images || !userData ? (
                <div>Error</div>
            ) : (
                <div>
                    <img src={userData.profilePictureUrl} alt={userData.username} />
                    <div>{userData.username}</div>
                    <div>{userData.bio}</div>
                    <div>
                        {userData.followers} followers | {userData.following} following
                    </div>
                    <div>
                        {userData.views} views | {userData.likes} likes
                    </div>
                    <div>
                        {images.map((image) => (
                            <img key={image.imageId} src={image.fileUrl} alt={image.imageTitle} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;
