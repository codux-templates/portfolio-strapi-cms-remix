import { FakeAPIContextProvider } from '../../api/fake/fake-provider';
import { RouterProvider, createMemoryRouter, matchRoutes } from 'react-router';
import { routes } from '../../router/routes';
import { ReactNode } from 'react';
import { FakeDataSettings } from '../../api/fake/fake-data';

/**
 *
 * @param {{}} props
 * @param {string} props.path - the path (route) of the page
 * @param {ReactNode} [props.children] -the component to render. we pass this only because codux tags boards by the components
 * preset in the board (for now). in practice this is redundant.
 * @param {FakeDataSettings} [props.setting] - settings for the fake data
 * @returns {ReactNode}
 */
export function PageWrapper(props: { path: string; children?: ReactNode; settings?: FakeDataSettings }) {
  if (props.children) {
    replaceRouteWithChildren(props.path, props.children);
  }

  const router = createMemoryRouter(routes, {
    initialEntries: [props.path || '/'],
  });
  return (
    <FakeAPIContextProvider settings={props.settings}>
      <RouterProvider router={router} />
    </FakeAPIContextProvider>
  );
}

/**
 * sets the children component to the path in the routes.
 * @param path the path of the page
 * @param children the component we want to render in that path
 */
function replaceRouteWithChildren(path: string, children: ReactNode) {
  const matchingRoutes = matchRoutes(routes, path);
  if (!matchingRoutes) {
    routes.push({ path: path, element: children });
  } else {
    const bestMatchingRoute = matchingRoutes[matchingRoutes.length - 1];
    bestMatchingRoute.route.element = children;
  }
}
