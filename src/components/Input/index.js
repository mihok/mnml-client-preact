import { h } from 'preact';
import PropTypes from 'prop-types';

import themer from '../ThemeProvider/themeHOC';

import './styles.css';

const Input = props => {
  const { sendMessage, theme, textBox, handleInput } = props;
  return (
    <form className={`Input__form--${theme}`} onSubmit={sendMessage}>
      <input
        className={`Input--${theme}`}
        placeholder="Type Here"
        onChange={e => handleInput(e)}
        name="messages"
        value={textBox}
      />
    </form>
  );
};

Input.propTypes = {
  handleInput: PropTypes.func,
  sendMessage: PropTypes.func,

  theme: PropTypes.string,
  textBox: PropTypes.string,
};

export default themer(Input);
