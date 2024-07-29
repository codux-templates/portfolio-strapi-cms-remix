import { createBoard } from '@wixc3/react-board';
import { PageWrapper } from '../../board-wrappers/page-wrapper';
import ErrorPage from '~/app/routes/error/route';

export default createBoard({
    name: 'Page - Error',
    tags: ['Page'],
    readyToSnapshot: () => {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });
    },
    Board: () => (
        <PageWrapper
            initialPath={`/error?title=Page Not Found&message=Looks like the page you're trying to visit doesn't exist`}
        >
            <ErrorPage />
        </PageWrapper>
    ),
});
