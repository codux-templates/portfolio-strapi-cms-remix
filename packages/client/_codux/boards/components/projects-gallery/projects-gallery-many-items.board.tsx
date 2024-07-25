import { createBoard } from '@wixc3/react-board';
import { ProjectsGallery } from '../../../../components/projects-gallery/projects-gallery';
import { ComponentWrapper } from '../../../board-wrappers/component-wrapper';

export default createBoard({
  name: 'Projects Gallery many items',
  Board: () => (
    <ComponentWrapper
      settings={{
        numberOfItems: 30,
      }}
    >
      <ProjectsGallery />
    </ComponentWrapper>
  ),
  isSnippet: false,
  environmentProps: {
    canvasWidth: 800,
    windowHeight: 470,
  },
});
