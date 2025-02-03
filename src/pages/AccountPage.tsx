import React from 'react';
import auth from '@/api/auth';
import Navbar from '@/components/Navbar';

const AccountPage: React.FC = () => {
    return (
        <div>
            <header className='h-20'>
                <Navbar />
            </header>
            <main>
                <div className='mx-auto my-24 max-w-[30rem] rounded-md p-6 shadow-xs sm:p-12 md:max-w-[40rem] md:p-24 lg:max-w-[60rem]'>
                    <h1>AccountPage</h1>
                    <button onClick={auth.logoutUser}>Logout</button>
                </div>
            </main>
        </div>
    );
};

export default AccountPage;
