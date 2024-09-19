/// <reference types="vite/client" />

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.ComponentProps<'svg'> & { title?: string }
    >;
    export default ReactComponent;
}

interface ImportMetaEnv {
    readonly VITE_API: string;
    readonly VITE_MEDIA: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
