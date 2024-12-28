import React, { useEffect, useState } from 'react';
import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import { confirmCodeSchema } from '@/utils/schemas/authSchemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '@/utils/userPool';

const ConfirmCodePage: React.FC = () => {
    useRedirectToAccount();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [error, setError] = useState<string | null>(null);

    const confirmCode = async () => {
        const code = searchParams.get('code');
        if (!code) return setError('Something went wrong. Try again.');

        const codeVal = confirmCodeSchema.safeParse(code);
        if (!codeVal.success) return setError('Something went wrong. Try again.');

        const name = searchParams.get('name');
        if (!name) return setError('Something went wrong. Try again.');

        setError(null);

        const cognitoUser = new CognitoUser({ Username: name, Pool: userPool });

        cognitoUser.confirmRegistration(code, true, (err?: Error) => {
            if (err) {
                console.error(err);
                return setError('Something went wrong. Try again.');
            }
            navigate('/account/login'); // TODO: implement automatic login
        });
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
