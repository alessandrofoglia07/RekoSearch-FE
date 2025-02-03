import React, { useEffect, useState } from 'react';
import auth from '@/api/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes: React.FC = () => {
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                const user = await auth.getCurrentAuthenticatedUser();
                setIsAuth(!!user);
            } catch (err) {
                setIsAuth(false);
            }
        })();
    }, [auth]);

    if (isAuth === undefined) return null;

    return isAuth ? <Outlet /> : <Navigate to='/account/login' replace />;
};

export default PrivateRoutes;
