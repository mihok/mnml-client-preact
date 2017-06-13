import { h, render, Component } from 'preact';
import './styles.css';
import themer from '../ThemeProvider/themeHOC';

const Input = (props) => {
  const { sendMessage, theme, textBox, handleInput } = props;
  return (
    <form className={`Input__Form__${theme}`} onSubmit={sendMessage}>
      <input
        className={`Input__${theme}`}
        placeholder="Type Here"
        onChange={e => handleInput(e)}
        name="messages"
        value={textBox}
      />
    </form>
  );
};
export default themer(Input);
