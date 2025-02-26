import React, { useState } from 'react';
import auth from '@/api/auth';
import authAxios from '@/api/authAxios';
import axios from '@/api/axios';

interface Image {
    file: File;
    previewUrl: string;
}

const UploadImageButton: React.FC = () => {
    const [image, setImage] = useState<Image | null>(null);

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

    return (
        <div>
            <input type='file' onChange={onImageChange} />
            {image && <img src={image.previewUrl} alt='preview' />}
            <button onClick={() => setImage(null)}>Remove</button>
            <button disabled={image == null} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default UploadImageButton;
