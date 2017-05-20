import { h, render } from "preact";
import "./styles.css";
import theme from "../ThemeProvider/themeHOC";

const Message = props => {
  // our message's content
  const content = props.content.map((msg, i) => <li key={i}>{msg}</li>);

  // our default message is a client message
  let message = (
    <ul class={`Message__client__${props.theme}`}>
      {content}
    </ul>
  );

  // if the iterated message is an operator; override `message`
  if (props.type === "operator") {
    message = (
      <div class={`Message__operator-box__${props.theme}`}>
        <ul className={`Message__operator__${props.theme}`}>
          {content}
        </ul>

        <img
          alt="Operator"
          className={`Message__Avatar-op__${props.theme}`}
          src="http://placehold.it/40x40/"
        />
      </div>
    );
  }
  // incoming props, mesage.content is an array.
  return (
    <li>
      {message}
    </li>
  );
};

export default theme(Message);
