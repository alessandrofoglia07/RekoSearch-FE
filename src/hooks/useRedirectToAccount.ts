import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useRedirectToAccount = () => {
    const navigate = useNavigate();
    const { getSession } = useAuth();

    useEffect(() => {
        (async () => {
            const session = await getSession();
            if (session) navigate('/');
        })();
    }, [navigate, getSession]);
};

export default useRedirectToAccount;