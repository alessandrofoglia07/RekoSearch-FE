import { type PropsWithChildren, createContext } from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

interface IAuthContext {
    authenticate: (Username: string, Password: string) => Promise<CognitoUserSession>;
    getSession: () => Promise<CognitoUserSession | null>;
    updateAppearance: (appearance: number) => Promise<void>;
    logout: () => void;
}

const AccountContext = createContext<IAuthContext>({} as IAuthContext);

const Account = ({ children }: PropsWithChildren) => {
    return <AccountContext.Provider value={{}}>{children} </AccountContext.Provider>;
};

export { Account, AccountContext };
