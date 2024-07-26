import { createBoard } from '@wixc3/react-board';
import ComponentWrapper from '../../../board-wrappers/component-wrapper';
import { ProjectsGallery } from '~/components/projects-gallery/projects-gallery';
import { getFakeData } from '~/api/fake/fake-data';

export default createBoard({
    name: 'Projects Gallery few items',
    Board: () => {
        const fakeData = getFakeData({ numberOfItems: 3 });
        return (
            <ComponentWrapper
                loaderData={{
                    root: {
                        projects: fakeData.projects,
                    },
                }}
            >
                <ProjectsGallery />
            </ComponentWrapper>
        );
    },
    isSnippet: false,
    environmentProps: {
        canvasWidth: 800,
        windowHeight: 470,
    },
});
