import { useContext } from "react";
import { AccountContext, IAuthContext } from "@/context/AccountContext";

const useAuth = (): IAuthContext => {
    return useContext(AccountContext);
};

export default useAuth;