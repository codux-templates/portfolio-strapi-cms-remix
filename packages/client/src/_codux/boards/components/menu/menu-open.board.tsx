import { createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../../board-wrappers/component-wrapper';
import { SiteMenu } from '../../../../components/site-menu/site-menu';

export default createBoard({
    name: 'Menu Open',
    Board: () => (
        <ComponentWrapper>
            <SiteMenu isOpen />
        </ComponentWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        canvasHeight: 700,
        canvasWidth: 700
    }
});
