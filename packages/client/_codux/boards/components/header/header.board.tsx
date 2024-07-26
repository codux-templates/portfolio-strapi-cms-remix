import { createBoard } from '@wixc3/react-board';
import { Header } from '~/components/header/header';
import ComponentWrapper from '../../../board-wrappers/component-wrapper';

export default createBoard({
    name: 'Header',
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
            <Header />
        </ComponentWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768,
        canvasWidth: 1024,
    },
});
