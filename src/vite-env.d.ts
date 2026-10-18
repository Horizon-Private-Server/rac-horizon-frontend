/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV_NAME?: string;
    readonly VITE_DEBUG?: string;
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_WS_ENDPOINT: string;
    readonly VITE_HORIZON_CUSTOM_MAPS_DOMAIN: string;
    readonly VITE_HORIZON_CUSTOM_MAP_REPOS_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
