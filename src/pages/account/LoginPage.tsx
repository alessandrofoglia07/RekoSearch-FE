import { AccountContext } from '@/context/AccountContext';
import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import { passwordSchema } from '@/utils/schemas/authSchemas';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
    emailOrUsername: string;
    password: string;
}

const LoginPage: React.FC = () => {
    useRedirectToAccount();
    const navigate = useNavigate();

    const { authenticate } = useContext(AccountContext);

    const [formData, setFormData] = useState<FormData>({
        emailOrUsername: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!passwordSchema.safeParse(formData.password).success) return setError('Invalid password');
        try {
            await authenticate(formData.emailOrUsername, formData.password);
            navigate('/');
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else if (typeof err === 'string') setError(err);
            else setError('An error occurred');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} autoComplete='off' spellCheck={false}>
                <input type='text' name='emailOrUsername' placeholder='Email or Username' value={formData.emailOrUsername} onChange={handleChange} />
                <input type='password' name='password' value={formData.password} onChange={handleChange} />
            </form>
            {error && <p>{error}</p>}
            <button onClick={handleSubmit}>Login</button>
            <a href='/login'>
                Don't have an account? <span>Register</span>
            </a>
        </div>
    );
};

export default LoginPage;
