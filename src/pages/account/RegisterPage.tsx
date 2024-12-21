import useRedirectToAccount from '@/hooks/useRedirectToAccount';
import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    useRedirectToAccount();

    const [formData, setFormData] = useState<FormData>({
        name: '',
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
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit} autoComplete='off' spellCheck={false}>
                <input type='text' name='name' autoFocus placeholder='Name' value={formData.name} onChange={handleChange} />
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                <input type='password' name='password' value={formData.password} onChange={handleChange} />
            </form>
            <button onClick={handleSubmit}>Register</button>
            <a href='/login'>
                Already have an account? <span>Login</span>
            </a>
        </div>
    );
};

export default RegisterPage;
