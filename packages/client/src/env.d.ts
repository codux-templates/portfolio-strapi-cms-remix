/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API: string;
    readonly VITE_MEDIA: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
