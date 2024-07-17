import { ReactNode } from 'react';
import { FakeAPIContextProvider } from '../../api/fake/fake-provider';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { FakeDataSettings } from '../../api/fake/fake-data';

/**
 *
 * @param {{}} props
 * @param {ReactNode} props.children - the component to render
 * @param {string} [props.path = /] - the actual path to use ('projects/1')
 * @param {string} [props.pattern] - the route pattern to use ('projects/:id')
 * @param {FakeDataSettings} [props.settings] - settings for the fake data
 * @returns
 */
export function ComponentWrapper(props: {
  children: ReactNode;
  settings?: FakeDataSettings;
  path?: string;
  patters?: string;
}) {
  const router = createMemoryRouter([{ path: props.patters || props.path || '/', element: props.children }], {
    initialEntries: [props.path || '/'],
  });
  return (
    <FakeAPIContextProvider settings={props.settings}>
      <RouterProvider router={router} />
    </FakeAPIContextProvider>
  );
}
