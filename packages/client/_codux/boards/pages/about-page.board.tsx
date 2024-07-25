import { createBoard } from '@wixc3/react-board';
import AboutPage from '~/app/routes/about/route';
import { PageWrapper } from '../../wrappers/page-wrapper';

export default createBoard({
  name: 'Page - About',
  tags: ['Page'],
  readyToSnapshot: () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  },
  Board: () => (
    <PageWrapper>
      <AboutPage />
    </PageWrapper>
  ),
});
