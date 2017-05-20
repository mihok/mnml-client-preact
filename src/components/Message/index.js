import { h, render } from "preact";
import "./styles.css";
import theme from "../ThemeProvider/themeHOC";

const Message = props => {
  const msgClass = () =>
    props.type === "operator"
      ? `Message__operator${props.theme}`
      : `Message__client${props.theme}`;

  // incoming props, mesage.content is an array.
  return (
    <div className={msgClass()}>
      {props.content.map(msg => <div>{msg}</div>)}
    </div>
  );
};

export default theme(Message);
