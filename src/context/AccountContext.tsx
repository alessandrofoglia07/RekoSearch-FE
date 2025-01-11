import { type PropsWithChildren, createContext } from 'react';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import userPool from '@/utils/userPool';
import { passwordSchema } from '@/utils/schemas/authSchemas';

export interface IAuthContext {
    register: (Username: string, Email: string, Password: string) => Promise<ISignUpResult>;
    authenticate: (UsernameOrEmail?: string, Password?: string) => Promise<CognitoUserSession>;
    confirmCode: (Username: string, Code: string) => Promise<void>;
    getSession: () => Promise<CognitoUserSession | null>;
    logout: () => void;
}

const AccountContext = createContext<IAuthContext>({} as IAuthContext);

const Account = ({ children }: PropsWithChildren) => {
    const register = (Username: string, Email: string, Password: string) => {
        return new Promise<ISignUpResult>((resolve, reject) => {
            const email = new CognitoUserAttribute({ Name: 'email', Value: Email });
            userPool.signUp(Username, Password, [email], [], (err, result) => {
                if (err) return reject(err);
                if (!result) return reject('Something went wrong.');
                resolve(result);
            });
        });
    };

    const getSession = () => {
        return new Promise<CognitoUserSession | null>((resolve, reject) => {
            const user = userPool.getCurrentUser();
            if (!user) return reject('No user found.');
            user.getSession((err: Error | null, session: CognitoUserSession | null) => {
                if (err) return reject(err);
                resolve(session);
            });
        });
    };

    const authenticate = (UsernameOrEmail?: string, Password?: string) => {
        return new Promise<CognitoUserSession>((resolve, reject) => {
            if (!UsernameOrEmail || !Password) return reject('Please fill in all fields.');
            if (!passwordSchema.safeParse(Password).success) return reject('Password does not meet requirements.');

            const user = new CognitoUser({ Username: UsernameOrEmail, Pool: userPool });
            const authDetails = new AuthenticationDetails({ Username: UsernameOrEmail, Password });

            user.authenticateUser(authDetails, {
                onSuccess: (session) => resolve(session),
                onFailure: (err) => reject(err)
            });
        });
    };

    const confirmCode = (Username: string, Code: string) => {
        return new Promise<void>((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool: userPool });
            user.confirmRegistration(Code, true, (err?: Error) => {
                if (err) return reject(err);
                resolve();
            });
        });
    };

    const logout = () => {
        const user = userPool.getCurrentUser();
        if (user) user.signOut();
    };

    return <AccountContext.Provider value={{ register, getSession, authenticate, confirmCode, logout }}>{children} </AccountContext.Provider>;
};

export { Account, AccountContext };
