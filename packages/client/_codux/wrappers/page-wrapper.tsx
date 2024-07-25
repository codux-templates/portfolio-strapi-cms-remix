import { useNavigate } from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import { PropsWithChildren } from 'react';
import App, { loader as rootPageLoader } from '~/app/root';
import { ROUTES } from '~/router/config';

// @remix-run/testing doesn't export this type
type StubRouteObject = Parameters<typeof createRemixStub>[0][0];

interface PageWrapperProps extends PropsWithChildren {
  routeParams?: Omit<StubRouteObject, 'Component'>;
  initialPath?: string;
}

export function PageWrapper({ children, routeParams = {}, initialPath = '/' }: PageWrapperProps) {
  const Page = createRemixStub([
    {
      Component: () => {
        return <App />;
      },
      id: 'root',
      loader: rootPageLoader,
      ErrorBoundary: () => {
        const navigate = useNavigate();
        return (
          <div>
            error
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              go back
            </button>
          </div>
        );
      },
      children: [
        ...Object.values(ROUTES).map((route) => ({
          path: route.path,
          ...routeParams,
          Component: () => children,
        })),
      ],
    },
  ]);

  return <Page initialEntries={[initialPath]} />;
}
