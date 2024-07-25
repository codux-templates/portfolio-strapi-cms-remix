import { createBoard } from '@wixc3/react-board';
import { createImage } from '~/api/fake/fake-data';
import { ProjectItem } from '~/components/project-item/project-item';

export default createBoard({
    name: 'ProjectItem',
    Board: () => (
        <ProjectItem
            title="Project Item"
            image={createImage({ width: 300 })}
            description="this is a very long description... Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
    ),
    isSnippet: true,
    environmentProps: {
        canvasWidth: 572,
    },
});
