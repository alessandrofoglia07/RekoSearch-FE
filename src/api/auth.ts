import { signUp, confirmSignUp, signIn, getCurrentUser, signOut } from "aws-amplify/auth";

const auth = {
    registerUser: async (username: string, email: string, password: string) => {
        try {
            return await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email
                    }
                }
            });
        } catch (err) {
            console.error("Error signing up:", err);
            throw err;
        }
    },
    verifyUser: async (username: string, code: string) => {
        try {
            await confirmSignUp({ username, confirmationCode: code });
        } catch (err) {
            console.error("Error verifying user:", err);
            throw err;
        }
    },
    loginUser: async (username: string, password: string) => {
        try {
            return await signIn({ username, password });
        } catch (err) {
            console.error("Error signing in:", err);
            throw err;
        }
    },
    getCurrentAuthenticatedUser: async () => {
        try {
            return await getCurrentUser();
        } catch (err) {
            console.error("Error getting current user:", err);
            return null;
        }
    },
    logoutUser: async () => {
        try {
            await signOut();
        } catch (err) {
            console.error("Error signing out:", err);
            throw err;
        }
    }
};

export default auth;