/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AWS_COGNITO_USER_POOL_ID: string;
    readonly VITE_AWS_REGION: string;
    readonly VITE_AWS_COGNITO_APP_CLIENT_ID: string;
    readonly VITE_APP_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}