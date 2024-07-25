import { createBoard } from '@wixc3/react-board';
import { getFakeData } from '~/api/fake/fake-data';
import ComponentWrapper from '../../../wrappers/component-wrapper';
import { ProjectsGallery } from '~/components/projects-gallery/projects-gallery';

export default createBoard({
    name: 'Projects Gallery many items',
    Board: () => {
        const fakeData = getFakeData({ numberOfItems: 30 });
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
