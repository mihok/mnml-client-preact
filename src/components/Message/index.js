import { h, render } from 'preact';
import './styles.css'

const Message = (props) => {
  const msgClass = () => (
    props.type === 'operator' ? 'Message__operator' : 'Message__client'
  );

  return <div className={msgClass()}>{props.children}</div>;
};

export default Message
