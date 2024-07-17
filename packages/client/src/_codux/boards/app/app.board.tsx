import { createBoard } from '@wixc3/react-board';
import { RealDataWrapper } from '../../board-wrappers/real-data-wrapper';
import { ROUTES } from '../../../router/config';

export default createBoard({
    name: 'App With CMS Data',
    Board: () => <RealDataWrapper path={ROUTES.projects.to()} />,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768,
    },
});
