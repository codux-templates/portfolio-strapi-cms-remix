import { createBoard } from '@wixc3/react-board';
import { createRemixStub } from '@remix-run/testing';
import App, { loader as rootPageLoader } from '~/app/root';
import IndexPage from '~/app/routes/_index/route';
import AboutPage from '~/app/routes/about/route';
import ProjectsPage from '~/app/routes/projects/route';
import ProjectPage, { loader as projectPageLoader } from '~/app/routes/projects_.$projectId/route';
import { ROUTES } from '~/router/config';

const Router = createRemixStub([
    {
        Component: () => {
            return <App />;
        },
        id: 'root',
        loader: rootPageLoader,
        children: [
            {
                path: '/',
                Component: () => {
                    return <IndexPage />;
                },
            },
            {
                path: ROUTES.about.path,
                Component: () => {
                    return <AboutPage />;
                },
            },
            {
                path: ROUTES.projects.path,
                Component: () => {
                    return <ProjectsPage />;
                },
            },
            {
                path: ROUTES.project.path,
                Component: () => {
                    return <ProjectPage />;
                },
                loader: projectPageLoader,
            },
        ],
    },
]);

export default createBoard({
    name: 'App',
    tags: ['App'],
    Board: () => <Router />,
    isSnippet: false,
    readyToSnapshot: () => {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
    },
    environmentProps: {
        canvasWidth: 840,
        windowWidth: 1920,
        windowHeight: 1080,
    },
});
