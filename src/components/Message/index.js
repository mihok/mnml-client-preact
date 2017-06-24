import { h } from 'preact';
import PropTypes from 'prop-types';

import themer from '../ThemeProvider/themeHOC';

import './styles.css';

const Message = props => {
  // our message's content
  const content = props.content.map((msg, i) => <li key={i}>{msg}</li>);

  // our default message is a client message
  let message = (
    <ul className={`Message__client__${props.theme}`}>
      {content}
    </ul>
  );

  // if the iterated message is an operator; override `message`
  if (props.type === 'operator') {
    message = (
      <div className={`Message__operator-box__${props.theme}`}>
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

  // TODO: Messages sent within a period of time should be aggregated.

  // incoming props, mesage.content is an array.
  return (
    <li className={`Message__box__${props.theme}`}>
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
