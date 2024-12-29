import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const useRedirectToAccount = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/account');
        }
    }, [navigate, auth.isAuthenticated]);
};

export default useRedirectToAccount;