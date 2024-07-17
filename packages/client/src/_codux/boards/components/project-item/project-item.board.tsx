import { createBoard } from '@wixc3/react-board';
import { ProjectItem } from '../../../../components/project-item/project-item';
import { createImage } from '../../../../api/fake/fake-data';

export default createBoard({
  name: 'ProjectItem',
  Board: () => (
    <ProjectItem
      title="Project Item"
      image={createImage({ width: 300 })}
      description="this is a very long description... aldskfj alskd jflsak jflksd jflaks jflksad jflksad jflsak jfl"
    />
  ),
  isSnippet: true,
  environmentProps: {
    canvasWidth: 572,
  },
});
