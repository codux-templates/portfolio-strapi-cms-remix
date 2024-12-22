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
import { ErrorComponent } from '~/components/error-component/error-component';
import { SiteWrapper } from '~/components/site-wrapper/site-wrapper';
import '~/styles/index.scss';
import '~/styles/util-classes.scss';

export const loader = async () => {
    const api = getApi();
    const projects = await api.getProjects();
    const about = await api.getAbout();
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
    const { title, message } = getErrorDetails(error);

    return (
        <SiteWrapper>
            <ErrorComponent title={title} message={message} />
        </SiteWrapper>
    );
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
