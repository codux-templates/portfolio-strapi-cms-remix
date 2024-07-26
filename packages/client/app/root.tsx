import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError,
} from '@remix-run/react';
import { APIContextProvider } from '~/api';
import { getApi } from '~/api/data-api';
import { SiteWrapper } from '~/components/site-wrapper/site-wrapper';
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
    let error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </>
        );
    }

    if (error instanceof Error) {
        error = error.message;
    } else {
        error = JSON.stringify(error);
    }

    return (
        <section
            style={{
                color: 'red',
                fontSize: 18,
                textAlign: 'center',
            }}
        >
            {String(error)}
        </section>
    );
}
