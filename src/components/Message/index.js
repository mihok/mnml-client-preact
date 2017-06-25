import { h } from 'preact';
import PropTypes from 'prop-types';

import themer from '../ThemeProvider/themeHOC';

import './styles.css';

const Message = props => {
  // our message's content
  const content = props.content.map((msg, i) => <li key={i}>{msg}</li>);

  // our default message is a client message
  let message = (
    <ul className={`Message__client--${props.theme}`}>
      {content}
    </ul>
  );

  // Ff the iterated message is an operator; override `message`
  if (props.type === 'operator') {
    message = (
      <div className={`Message__operatorWrapper--${props.theme}`}>
        <ul className={`Message__operator--${props.theme}`}>
          {content}
        </ul>

        <img
          alt="Operator"
          className={`Message__avatar--${props.theme}`}
          src="http://placehold.it/40x40/"
        />
      </div>
    );
  }

  // Incoming props, mesage.content is an array.
  return (
    <li className={`Message__box--${props.theme}`}>
      {message}
    </li>
  );
};

Message.propTypes = {
  theme: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.string),
};

export default themer(Message);
