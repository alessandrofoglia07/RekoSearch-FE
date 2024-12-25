import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ConfirmCodePage: React.FC = () => {
    const [searchParams] = useSearchParams();

    return <div>ConfirmCodePage</div>;
};

export default ConfirmCodePage;
