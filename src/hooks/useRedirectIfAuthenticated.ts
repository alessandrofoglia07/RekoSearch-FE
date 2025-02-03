import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import auth from "@/api/auth";

const useRedirectIfAuthenticated = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const user = await auth.getCurrentAuthenticatedUser();
            if (user) navigate('/');
        })();
    }, [navigate, auth]);
};

export default useRedirectIfAuthenticated;