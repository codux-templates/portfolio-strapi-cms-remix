import { createContext, useMemo } from 'react';
import { StrapiConnection } from './strapi-connection';
import { Connection } from './types';
import { APIResponse, APIResponseCollection } from './strapi-types';
import { SWRConfig } from 'swr';

export function createApi(connection: Connection) {
  return {
    getProject: (id: number) =>
      connection.sendGetRequest<APIResponse<'api::project.project'>>(['projects', id.toString()]),
    getProjects: () =>
      connection.sendGetRequest<APIResponseCollection<'api::project.project'>>(['projects'], {
        populate: 'coverImage',
        sort: 'orderIndex'
      }),
    getProjectItemsByProject: (projectId: number) =>
      connection.sendGetRequest<APIResponseCollection<'api::project-item.project-item'>>(['project-items'], {
        'filters[project]': projectId.toString(),
        populate: 'image',
        sort: 'orderIndex'
      }),
    getAbout: () =>
      connection.sendGetRequest<APIResponse<'api::about.about'>>(['about'], {
        populate: 'image',
      }),
  };
}

export type API = ReturnType<typeof createApi>;

export const APIContext = createContext<API>({} as API);

const MINUTE = 60000;

export function APIContextProvider(props: { children: React.ReactNode }) {
  const api = useMemo(() => {
    const connection = new StrapiConnection();
    return createApi(connection);
  }, []);
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        refreshInterval: 60 * MINUTE,
      }}
    >
      <APIContext.Provider value={api}>{props.children}</APIContext.Provider>
    </SWRConfig>
  );
}
