import { createBoard } from '@wixc3/react-board';
import { ComponentWrapper } from '../../../board-wrappers/component-wrapper';
import { SiteMenu } from '../../../../components/site-menu/site-menu';

export default createBoard({
  name: 'Menu Closed',
  Board: () => (
    <ComponentWrapper>
      <SiteMenu />
    </ComponentWrapper>
  ),
  isSnippet: false,
});
