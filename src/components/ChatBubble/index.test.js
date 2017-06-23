/* const render = require('preact-render-to-string');
 * const App = require('../thing');*/
import render from 'preact-render-to-string'
import {h} from 'preact'
import ChatBubble from '.'

describe('App component', () => {
  it('should render ', () => {
    const tree = render(
      <ChatBubble />
    );
    expect(tree).toMatchSnapshot();
  });
});
