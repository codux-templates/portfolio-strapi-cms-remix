import { generatePath } from 'react-router-dom';

/**
 * we believe it's better to use consts than strings for routes.
 */
const ABOUT = '/about';
const PROJECTS = '/projects';
const PROJECT = `${PROJECTS}/:id`;

/**
 * @property path - the path (template) of the route to be used in the router
 * @property to - a funtion to generate a link to a specific page. to be used in `Link` and such
 */
export const ROUTES = {
  about: { path: ABOUT, to: () => ABOUT },
  projects: { path: PROJECTS, to: () => PROJECTS },
  project: { path: PROJECT, to: (projectId: number) => generatePath(PROJECT, { id: projectId.toString() }) },
};

export type ROUTE_KEYS = keyof typeof ROUTES;

/**
 * route params types. to be used for example in `useParams<RouteParams<'projects/:id'>>()`
 */
export type RouteParams = {
  [PROJECT]: { id: string };
};
