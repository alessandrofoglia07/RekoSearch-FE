import React, { useState } from 'react';
import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import { confirmCodeSchema } from '@/utils/schemas/authSchemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const ConfirmCodePage: React.FC = () => {
    useRedirectToAccount();

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { confirmCode } = useAuth();

    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        const defaultErr = 'Something went wrong. Try again.';

        const codeVal = confirmCodeSchema.safeParse(code);
        if (!codeVal.success) return setError(defaultErr);

        const name = searchParams.get('name');
        if (!name) return setError(defaultErr);

        setError(null);

        try {
            await confirmCode(name, code);
            navigate('/account/login');
        } catch (err) {
            console.error(err);
            setError(defaultErr);
        }
    };

    return (
        <div>
            <input type='text' name='code' placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={submit}>Submit</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ConfirmCodePage;
