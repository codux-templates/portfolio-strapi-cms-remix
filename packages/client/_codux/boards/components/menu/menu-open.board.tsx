import { createBoard } from '@wixc3/react-board';
import ComponentWrapper from '../../../wrappers/component-wrapper';
import { SiteMenu } from '~/components/site-menu/site-menu';

export default createBoard({
  name: 'Menu Open',
  Board: () => (
    <ComponentWrapper
      loaderData={{
        root: {
          projects: [
            {
              id: '1',
              attributes: {
                title: 'Project 1',
              },
            },
            {
              id: '2',
              attributes: {
                title: 'Project 2',
              },
            },
          ],
        },
      }}
    >
      <SiteMenu isOpen />
    </ComponentWrapper>
  ),
  isSnippet: false,
  environmentProps: {
    canvasHeight: 700,
    canvasWidth: 700,
  },
});
