/* const render = require('preact-render-to-string');
 * const App = require('../thing');*/
import render from 'preact-render-to-string';
import { h } from 'preact';
import Message from '.';

describe('App component', () => {
  it('should render ', () => {
    const props = {
      content: [], // message content
    };

    const tree = render(<Message content={props.content} />);
    expect(tree).toMatchSnapshot();
  });
});
