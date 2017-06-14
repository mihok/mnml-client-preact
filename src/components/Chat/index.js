/**
 * Main chat component handles displaying chat messages and passes
 * functions to the input to send messages
 * Has scroll to bottom functionality for keeping window scoll at bottom of the chat.
 * Needs to be a class based component in order to have that functionality ^
 */

import { h, render, Component } from 'preact';
import './styles.css';
import Message from '../Message/';
import themer from '../ThemeProvider/themeHOC';
import Input from '../Input/index';

class Chat extends Component {
  componentDidMount () {
    this.scrollToBottom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.container.scrollTop = this.container.scrollHeight;
  };

  renderMessages = () => this.props.messages.map(msg => <Message type={msg.author} content={msg.content} />, // msg.content is an array!
    );

  render () {
    const {
      toggleChat,
      textBox,
      handleInput,
      sendMessage,
      theme,
    } = this.props;

    return (
      <section className={`Chat__${theme}`}>

        <header className={`Chat__Header__${theme}`}>
          <div className={`Chat__OperatorName__${theme}`}>Chat with John</div>
          <button
            className={`Chat__CloseBtn__${theme}`}
            onClick={() => toggleChat(false)}
          >
            x{' '}
          </button>
        </header>

        {/* Container for text input and reading messages */}
        <ul className={`Chat__Body__${theme}`} ref={c => (this.container = c)}>
          {this.renderMessages()}
        </ul>

        <Input
          sendMessage={sendMessage}
          textBox={textBox}
          handleInput={handleInput}
        />

        {/*
        <form class={`Chat__Form`} onSubmit={sendMessage}>
          <input
            class={`Chat__Input__${theme}`}
            placeholder="Type Here"
            onChange={e => handleInput(e)}
            name="messages"
            value={textBox}
          />
        </form>
        */}

      </section>
    );
  }
}

export default themer(Chat);
