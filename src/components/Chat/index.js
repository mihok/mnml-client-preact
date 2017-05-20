/**
 * Main chat component handles displaying chat messages and passes
 * functions to the input to send messages
 * Has scroll to bottom functionality for keeping window scoll at bottom of the chat.
 * Needs to be a class based component in order to have that functionality ^
 */

import { h, render, Component } from "preact";
import "./styles.css";
import "../../variables.css";
import Message from "../Message/";
import theme from "../ThemeProvider/themeHOC";

class Chat extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.container.scrollTop = this.container.scrollHeight;
  };

  renderMessages = () => {
    return this.props.messages.map(msg => {
      return <Message type={msg.author} content={msg.content} />; // msg.content is an array!
    });
  };

  render() {
    const {
      toggleChat,
      messages,
      textBox,
      handleInput,
      sendMessage,
      theme
    } = this.props;

    return (
      <section class={`Chat${theme}`}>

        <header class={`Chat__Header${theme}`}>
          <div class={`Chat__OperatorName${theme}`}>Chat with John</div>
          <button
            class={`Chat__CloseBtn${theme}`}
            onClick={() => toggleChat(false)}
          >
            x
          </button>
        </header>

        {/* Container for text input and reading messages */}
        <div class={`Chat__Body${theme}`} ref={c => (this.container = c)}>
          {this.renderMessages()}
        </div>

        <form class={`Chat__Form`} onSubmit={sendMessage}>
          <input
            class={`Chat__Input${theme}`}
            placeholder="Type Here"
            onChange={e => handleInput(e)}
            name="messages"
            value={textBox}
          />
        </form>

      </section>
    );
  }
}

export default theme(Chat);
