import React, { useState } from 'react';
import useRedirectToAccount from '@/hooks/useRedirectIfAuthenticated';
import { nameSchema, emailSchema, passwordSchema } from '@/utils/schemas/authSchemas';
import { useNavigate } from 'react-router-dom';
import auth from '@/api/auth';

interface FormData {
    username: string;
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    useRedirectToAccount();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<Record<keyof FormData, string | null>>({
        username: null,
        email: null,
        password: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateFields = (): boolean => {
        const valUsername = nameSchema.safeParse(formData.username);
        const valEmail = emailSchema.safeParse(formData.email);
        const valPassword = passwordSchema.safeParse(formData.password);

        let canContinue = true;

        if (!valUsername.success) {
            const err = valUsername.error.errors[0]?.message || null;
            setError((prev) => ({ ...prev, username: err }));
            canContinue = false;
        } else setError((prev) => ({ ...prev, username: null }));
        if (!valEmail.success) {
            const err = valEmail.error.errors[0]?.message || null;
            setError((prev) => ({ ...prev, email: err }));
            canContinue = false;
        } else setError((prev) => ({ ...prev, email: null }));
        if (!valPassword.success) {
            const err = valPassword.error.errors[0]?.message || null;
            setError((prev) => ({ ...prev, password: err }));
            canContinue = false;
        } else setError((prev) => ({ ...prev, password: null }));

        return canContinue;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateFields()) return;

        try {
            await auth.registerUser(formData.username, formData.email, formData.password);
            navigate(`/account/confirm?email=${formData.email}`);
        } catch (err) {
            if (err instanceof Error) setError((prev) => ({ ...prev, password: err.message }));
            else if (typeof err === 'string') setError((prev) => ({ ...prev, password: err }));
            else setError((prev) => ({ ...prev, password: 'Something went wrong. Try again.' }));
        }
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit} autoComplete='off' spellCheck={false}>
                <input type='text' name='username' autoFocus placeholder='username' value={formData.username} onChange={handleChange} />
                {error.username && <span>{error.username}</span>}
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                {error.email && <span>{error.email}</span>}
                <input type='password' name='password' value={formData.password} onChange={handleChange} />
                {error.password && <span>{error.password}</span>}
            </form>
            <button onClick={handleSubmit}>Register</button>
            <a href='/account/login'>
                Already have an account? <span>Login</span>
            </a>
        </div>
    );
};

export default RegisterPage;
