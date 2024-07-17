import { useContext } from 'react';
import { APIContext } from './data-api';
import useSWR, { useSWRConfig } from 'swr';

const getProjectKey = (id: number) => `project/${id}`;

export function useProjects() {
  const api = useContext(APIContext);
  const { mutate } = useSWRConfig();

  return useSWR('project/list', api.getProjects, {
    //here we add a map of items to the cache so we can read a single item from it later
    onSuccess: (projects) => {
      projects.data.forEach((project) => {
        const key = getProjectKey(project.id);
        mutate(key, project).catch((e) => {
          console.error('mutate failed', e);
        });
      });
    },
  });
}

export function useProject(id: number) {
  const api = useContext(APIContext);
  return useSWR(getProjectKey(id), async () => {
    const projectWrapped = await api.getProject(id);
    return projectWrapped.data;
  });
}

export function useAbout() {
  const api = useContext(APIContext);
  return useSWR('about', api.getAbout);
}

export function useProjectItems(projectId: number) {
  const api = useContext(APIContext);
  return useSWR(`project-items/${projectId}`, () => api.getProjectItemsByProject(projectId));
}
