import { createBoard } from '@wixc3/react-board';
import ProjectsPage from '~/app/routes/projects/route';
import { PageWrapper } from '../../board-wrappers/page-wrapper';

export default createBoard({
    name: 'Page - Projects',
    tags: ['Page'],
    readyToSnapshot: () => {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
    },
    Board: () => (
        <PageWrapper>
            <ProjectsPage />
        </PageWrapper>
    ),
});
