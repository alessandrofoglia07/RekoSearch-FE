import { CognitoUserPool } from "amazon-cognito-identity-js";

const UserPoolId = import.meta.env.VITE_AWS_USER_POOL_ID;
const ClientId = import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID;

if (!UserPoolId) {
    throw new Error("AWS User Pool ID is not set");
}

if (!ClientId) {
    throw new Error("AWS User Pool Client ID is not set");
}

export default new CognitoUserPool({
    UserPoolId,
    ClientId,
    Storage: localStorage
});