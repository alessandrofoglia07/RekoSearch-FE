import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import React, { useState } from 'react';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    useRedirectToAccount();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} autoComplete='off' spellCheck={false}>
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                <input type='password' name='password' value={formData.password} onChange={handleChange} />
            </form>
            <button onClick={handleSubmit}>Login</button>
            <a href='/login'>
                Don't have an account? <span>Register</span>
            </a>
        </div>
    );
};

export default LoginPage;
