import { isRouteErrorResponse, useNavigate, useRouteError } from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import { PropsWithChildren } from 'react';
import App, { loader as rootPageLoader } from '~/app/root';
import { ROUTES } from '~/router/config';

// @remix-run/testing doesn't export this type
type StubRouteObject = Parameters<typeof createRemixStub>[0][0];
type RouteParams = Omit<StubRouteObject, 'Component' | 'children' | 'path'>;

interface PageWrapperProps extends PropsWithChildren {
    initialPath?: string;
    rootRouteParams?: RouteParams;
    pageRouteParams?: RouteParams;
}

export function PageWrapper({
    children,
    rootRouteParams = {},
    pageRouteParams = {},
    initialPath = '/',
}: PageWrapperProps) {
    const RemixStub = createRemixStub([
        {
            Component: () => <App />,
            id: 'root',
            loader: rootPageLoader,
            ErrorBoundary,
            children: [
                ...Object.values(ROUTES).map((route) => ({
                    path: route.path,
                    Component: () => children,
                    ...pageRouteParams,
                })),
            ],
            ...rootRouteParams,
        },
    ]);

    return <RemixStub initialEntries={[initialPath]} />;
}

function ErrorBoundary() {
    const navigate = useNavigate();
    const error = useRouteError();

    const goBack = (
        <button
            style={{
                border: '1px solid dodgerblue',
                cursor: 'pointer',
                padding: '0 3px',
                borderRadius: '5px',
                color: 'dodgerblue',
            }}
            onClick={() => navigate(-1)}
        >
            Go Back
        </button>
    );

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
                {goBack}
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
                {goBack}
            </div>
        );
    } else {
        return <h1>Unknown Error {goBack}</h1>;
    }
}
