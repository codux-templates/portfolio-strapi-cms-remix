import { createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../../board-wrappers/component-wrapper';
import { Footer } from '../../../../components/footer/footer';

export default createBoard({
    name: 'Footer',
    Board: () => (
        <ComponentWrapper>
            <Footer />
        </ComponentWrapper>
    ),
    isSnippet: false,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768,
        canvasWidth: 1024,
    },
});
