import { useContext } from "react";
import { AccountContext } from "@/context/AccountContext";

const useAuth = () => {
    return useContext(AccountContext);
};

export default useAuth;