import { createBoard } from '@wixc3/react-board';
import ProjectPage, { loader } from '~/app/routes/projects_.$projectId/route';
import { PageWrapper } from '../../board-wrappers/page-wrapper';

export default createBoard({
    name: 'Page - Project',
    tags: ['Page'],
    readyToSnapshot: () => {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
    },
    Board: () => (
        <PageWrapper initialPath={'/projects/3'} routeParams={{ loader }}>
            <ProjectPage />
        </PageWrapper>
    ),
});
