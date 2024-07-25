import { createBoard } from '@wixc3/react-board';
import { getFakeData } from '~/api/fake/fake-data';
import { ProjectsGallery } from '~/components/projects-gallery/projects-gallery';
import ComponentWrapper from '../../../wrappers/component-wrapper';

export default createBoard({
    name: 'Projects Gallery',
    Board: () => {
        const fakeData = getFakeData();
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
