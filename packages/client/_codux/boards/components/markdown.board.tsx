import { createBoard } from '@wixc3/react-board';
import Markdown from 'markdown-to-jsx';

export default createBoard({
  name: 'Markdown',
  Board: () => (
    <div className="markdown">
      <Markdown>this is a text for **markdown**</Markdown>
    </div>
  ),
  isSnippet: true,
});
