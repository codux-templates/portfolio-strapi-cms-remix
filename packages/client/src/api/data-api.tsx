import { createContext, useMemo } from 'react';
import { StrapiConnection } from './strapi-connection';
import { Connection, StrapiAbout, StrapiProjectItem } from './types';

export function createApi(connection: Connection) {
    return {
        getProject: async (id: number) => {
            const response = await connection.sendGetRequest<{ data: StrapiProjectItem }>([
                'projects',
                id.toString(),
            ]);
            return response.data;
        },
        getProjects: async () => {
            const response = await connection.sendGetRequest<{ data: StrapiProjectItem[] }>(
                ['projects'],
                {
                    populate: 'coverImage',
                    sort: 'orderIndex',
                },
            );
            return response.data;
        },
        getProjectItemsByProject: async (projectId: number) => {
            const response = await connection.sendGetRequest<{ data: StrapiProjectItem[] }>(
                ['project-items'],
                {
                    'filters[project]': projectId.toString(),
                    populate: 'image',
                    sort: 'orderIndex',
                },
            );
            return response.data;
        },
        getAbout: async () => {
            const response = await connection.sendGetRequest<{ data: StrapiAbout }>(['about'], {
                populate: 'image',
            });
            return response.data;
        },
    };
}

export type API = ReturnType<typeof createApi>;

export const APIContext = createContext<API>({} as API);

export function APIContextProvider(props: { children: React.ReactNode }) {
    const api = useMemo(() => {
        const connection = new StrapiConnection();
        return createApi(connection);
    }, []);
    return <APIContext.Provider value={api}>{props.children}</APIContext.Provider>;
}

let api: API;

export const getApi = () => {
    api ??= createApi(new StrapiConnection());
    return api;
};
