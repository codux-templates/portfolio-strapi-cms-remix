import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError,
} from '@remix-run/react';
import { useEffect } from 'react';
import { APIContextProvider } from '~/api';
import { getApi } from '~/api/data-api';
import { SiteWrapper } from '~/components/site-wrapper/site-wrapper';
import { ROUTES } from '~/router/config';
import '~/styles/index.css';
import '~/styles/util-classes.scss';

/* This code does not work in Codux, because our resolver does not support the `url` query parameter.
import indexStylesHref from '~/styles/index.css?url';
import utilClassesStylesHref from '~/styles/util-classes.scss?url';
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: indexStylesHref },
    { rel: 'stylesheet', href: utilClassesStylesHref },
  ];
};*/

export const loader = async () => {
    const api = getApi();
    const { data: projects } = await api.getProjects();
    const { data: about } = await api.getAbout();
    return { projects, about };
};

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <>
            <APIContextProvider>
                <SiteWrapper>
                    <Outlet />
                </SiteWrapper>
            </APIContextProvider>
        </>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    const isRouteError = isRouteErrorResponse(error);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { title, message } = getErrorDetails(error);

        // hack to handle https://github.com/remix-run/remix/issues/1136
        window.location.href = ROUTES.error.to(title, message);
    }, [isRouteError, error]);

    // we are navigating to the error page in the effect above
    return null;
}

function getErrorDetails(error: unknown) {
    let title: string;
    let message: string | undefined;

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            title = 'Page Not Found';
            message = "Looks like the page you're trying to visit doesn't exist";
        } else {
            title = `${error.status} - ${error.statusText}`;
            message = error.data?.message ?? '';
        }
    } else {
        title = 'Unknown error ocurred';
    }

    return { title, message };
}
