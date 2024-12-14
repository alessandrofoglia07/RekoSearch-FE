import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/MainPage';
import RegisterPage from '@/pages/account/RegisterPage';
import LoginPage from '@/pages/account/LoginPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />

            <Route path='/account/register' element={<RegisterPage />} />
            <Route path='/account/login' element={<LoginPage />} />

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default App;
