import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import '@/style.css';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_CLIENT_ID,
            signUpVerificationMethod: 'code',
            loginWith: {
                email: true,
                username: true,
                phone: false
            }
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
