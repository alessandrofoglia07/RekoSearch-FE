import React, { useEffect, useState } from 'react';
import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import { confirmCodeSchema } from '@/utils/schemas/authSchemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmCodePage: React.FC = () => {
    useRedirectToAccount();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [error, setError] = useState<string | null>(null);

    const confirmCode = async () => {
        const defaultErr = 'Something went wrong. Try again.';
        const code = searchParams.get('code');
        if (!code) return setError(defaultErr);

        const codeVal = confirmCodeSchema.safeParse(code);
        if (!codeVal.success) return setError(defaultErr);

        const email = searchParams.get('email');
        if (!email) return setError(defaultErr);

        setError(null);

        try {
            await axios.post(`https://${import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID}.auth.${import.meta.env.VITE_AWS_REGION}.amazoncognito.com/confirm-signup`, {
                email,
                code
            });

            navigate('/account/login');
        } catch (err) {
            console.error(err);
            setError(defaultErr);
        }
    };

    useEffect(() => {
        try {
            confirmCode();
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Try again.');
        }
    }, [searchParams]);

    return <div>{error && <p>{error}</p>}</div>;
};

export default ConfirmCodePage;
