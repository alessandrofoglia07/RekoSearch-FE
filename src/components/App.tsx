import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/MainPage';
import RegisterPage from '@/pages/account/RegisterPage';
import LoginPage from '@/pages/account/LoginPage';
import AccountPage from '@/pages/AccountPage';
import ConfirmCodePage from '@/pages/account/ConfirmCodePage';
import PrivateRoutes from '@/context/PrivateRoutes';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route element={<PrivateRoutes />}>
                <Route path='/account' element={<AccountPage />} />
            </Route>
            <Route path='/account/register' element={<RegisterPage />} />
            <Route path='/account/login' element={<LoginPage />} />
            <Route path='/account/confirm' element={<ConfirmCodePage />} />

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default App;
