import { h, render, Component } from "preact";
import "./styles.css";
import theme from '../ThemeProvider/themeHOC';

const Input = props => {
  const {sendMessage, theme, textBox, handleInput} = props
  return (
    <form class={`Input__Form__${theme}`} onSubmit={sendMessage}>
      <input
        class={`Input__${theme}`}
        placeholder="Type Here"
        onChange={e => handleInput(e)}
        name="messages"
        value={textBox}
      />
    </form>
  );
};
export default theme(Input);
