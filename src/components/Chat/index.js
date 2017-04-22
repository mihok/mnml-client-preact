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
      console.log('incoming message is', msg)
      return <Message type={msg.author} content={msg.content}></Message> // msg.content is an array!
    });
  };

  render() {
    const {
      chatStyle,
      toggleChat,
      messages,
      textBox,
      handleInput,
      sendMessage
    } = this.props;

    return (
      <section class={`Chat-${chatStyle}`}>

        <header class={`Chat__Header-${chatStyle}`}>
          <div class={`Chat__OperatorName-${chatStyle}`}>Chat with John</div>
          <button
            class={`Chat__CloseBtn-${chatStyle}`}
            onClick={() => toggleChat(false)}
          >
            x
          </button>
        </header>

        {/* Container for text input and reading messages */}
        <div class={`Chat__Body-${chatStyle}`} ref={c => this.container = c}>
          {this.renderMessages()}
        </div>

        <form class={`Chat__Form`} onSubmit={sendMessage}>
          <input
            class={`Chat__Input-${chatStyle}`}
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

export default Chat;
