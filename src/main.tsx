import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import '@/style.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';

const cognitoAuthConfig = {
    authority: `https://cognito-idp.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${import.meta.env.VITE_COGNITO_USER_POOL_ID}`,
    client_id: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
    redirect_uri: `${import.meta.env.VITE_APP_URL}/callback`, // TODO: implement callback page
    response_type: 'code',
    scope: 'email openid phone'
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider {...cognitoAuthConfig}>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
