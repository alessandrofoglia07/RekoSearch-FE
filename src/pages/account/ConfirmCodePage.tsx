import React, { useEffect } from 'react';
import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import { confirmCodeSchema } from '@/utils/schemas/authSchemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '@/utils/userPool';

const ConfirmCodePage: React.FC = () => {
    useRedirectToAccount();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const confirmCode = async () => {
        const code = searchParams.get('code');
        if (!code) return; // TODO: handle error

        const codeVal = confirmCodeSchema.safeParse(code);
        if (!codeVal.success) return; // TODO: handle error

        const name = searchParams.get('name');
        if (!name) return; // TODO: handle error

        const cognitoUser = new CognitoUser({ Username: name, Pool: userPool });

        cognitoUser.confirmRegistration(code, true, (err?: Error) => {
            if (err) {
                // TODO: handle error
            }
            navigate('/account/login'); // TODO: implement automatic login
        });
    };

    return <div>ConfirmCodePage</div>;
};

export default ConfirmCodePage;
