import Navbar from '@/components/Navbar';
import useAuth from '@/hooks/useAuth';
import React from 'react';

const AccountPage: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div>
            <header className='h-20'>
                <Navbar />
            </header>
            <main>
                <div className='mx-auto my-24 max-w-[30rem] rounded-md p-6 shadow-sm sm:p-12 md:max-w-[40rem] md:p-24 lg:max-w-[60rem]'>
                    <h1>AccountPage</h1>
                    <button onClick={logout}>Logout</button>
                </div>
            </main>
        </div>
    );
};

export default AccountPage;
