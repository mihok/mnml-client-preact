import { h, render } from "preact";
import "./styles.css";

const Message = props => {
  const msgClass = () =>
    (props.type === "operator" ? "Message__operator" : "Message__client");

  // incoming props, mesage.content is an array.
  return (
    <div className={msgClass()}>
      {props.content.map(msg => <div>{msg}</div>)}
    </div>
  );
};

export default Message;
