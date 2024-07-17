import { createBoard } from '@wixc3/react-board';
import { ProjectPage } from '../../../../pages/project-page/project-page';
import { ROUTES } from '../../../../router/config';
import { PageWrapper } from '../../../board-wrappers/page-wrapper';

export default createBoard({
    name: 'Page-Project',
    Board: () => (
        <PageWrapper path={ROUTES.project.to(1)}>
            <ProjectPage />
        </PageWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768
    },
});
