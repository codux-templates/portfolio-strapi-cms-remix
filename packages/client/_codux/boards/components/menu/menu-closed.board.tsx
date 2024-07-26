import { createBoard } from '@wixc3/react-board';
import ComponentWrapper from '../../../board-wrappers/component-wrapper';
import { SiteMenu } from '~/components/site-menu/site-menu';

export default createBoard({
    name: 'Menu Closed',
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
            <SiteMenu />
        </ComponentWrapper>
    ),
    isSnippet: false,
});
