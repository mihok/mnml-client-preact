import { h, Component } from 'preact';
import './styles.css';
import Chat from '../Chat/';
import ChatBubble from '../ChatBubble/';
import ThemeProvider from '../ThemeProvider/index';

// TODO: socket io doesn't properly import from webpack?
/* import io from "socket.io-client";*/ const io = window.io || {};

const remoteHost = process.env.REMOTE_HOST || 'localhost';
const remotePort = process.env.REMOTE_PORT || '8000';
const socketPath = `http://${remoteHost}:${remotePort}`;


class App extends Component {
  state = {
    chatOpen: true,
    messages: [],
    textBox: '',
    theme: 'Messenger', // wrapped with theme provider + HOC
  };

  componentDidMount () {
    window.jam = this;
    this.socket = io.connect(socketPath, {
      secure: false,
      reconnectionAttempts: 10,
      query: 'type=client',
    });

    this.socket.on('operator:message', this.receiveMessage);
    this.socket.on('chat:new', this.handleNewConnection);
  }

  // ====================================
  // Event Handlers
  // ====================================

  toggleChat = bool => {
    this.setState({ chatOpen: bool });
  };

  handleInput = e => {
    this.setState({ textBox: e.target.value });
  };

  // ====================================
  //  Socket Methods
  // ====================================
  /**
  * @description On connecting to the socket server save a session object into the state
  */
  handleNewConnection = e => {
    this.setState({
      session: JSON.parse(e),
    });
  };

  // ====================================
  //  Message Methods
  // ====================================


  // TODO: docstring
  // save the message to local stage: either combining them or not.
  saveMessageToState = msg => {
    debugger
    const formattedMsg = this.formatMessage(msg, 'local');
    if (this.combineLastMessage(formattedMsg)) {
      const messages = this.state.messages;
      messages[messages.length - 1].content.push(...formattedMsg.content);

      this.setState({
        messages,
        textBox: '',
      });
    } else {
      this.setState({
        messages: [...this.state.messages, formattedMsg],
        textBox: '',
      });
    }
  };

  saveMessageToServer = msg => {
    const formattedMsg = this.formatMessage(msg);
    this.socket.emit('client:message', JSON.stringify(formattedMsg));
  };

  /** Send Message
   * @summary - Allow a user to send a message.
   * @description - Passes the message through some functions to save it locally and remotely
   * @param {object} e - event object; used to prevent refreshing the page
   */
  sendMessage = e => {
    e.preventDefault(); // must be the first thing to happen
    if (this.state.textBox === '') return;
    const msg = this.state.textBox;
    this.saveMessageToState(msg);
    this.saveMessageToServer(msg);
  };

  receiveMessage = data => {
    const msg = [JSON.parse(data)] // in arr so it can be combined

    if (this.combineLastMessage(msg)) {
      const messages = this.state.messages;
      messages[messages.length - 1].content.push(...msg.content);

      this.setState({
        messages,
        textBox: '',
      });
    } else {
      this.setState({
        messages: [...this.state.messages, msg],
        textBox: '',
      });
    }
    /* this.setState({
     *   messages: [...this.state.messages, { content: [msg.content], author: 'operator' }],
     * });*/
  };

  /** Format Message
   * @description: Formats a message to a proper object with metadata
   * @param {msg}: takes a plain ol' string that is a chat message
   * @param {destination}: format the message differently based on the destination it's going to.
   * @returns {obj} with timestamp, author data, and content.
   */
  formatMessage = (msg, destination) => {
    const content = destination === 'local' ? [msg] : msg;

    return {
      timestamp: Date.now(),
      author: `client-${this.state.session.client.id}`,
      content,
      chat: this.state.session.id
    }
  };

  /**
   * @summary Checks if message can combine with prev. message in local state.
   * @param {object} msg - A message from a user
   * @returns {boolean}
   */
  combineLastMessage = msg => {
    const previousMessage = this.state.messages[this.state.messages.length - 1];
    if (!previousMessage) return false; // return if this is the first message in the conversation
    if (msg.author !== previousMessage.author) {
      return false;
    }
    return true;
  };

  renderClosedChat = () => <ChatBubble toggleChat={this.toggleChat} />;

  renderOpenChat = () =>
    (<Chat
      toggleChat={this.toggleChat}
      messages={this.state.messages}
      textBox={this.state.textBox}
      handleInput={this.handleInput}
      sendMessage={this.sendMessage}
    />);

  renderChat = () => (this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat());

  // -- Component Return -- //

  render () {
    const { theme } = this.state;

    return (
      <ThemeProvider theme={this.state.theme}>
        <div className={`App App__${theme}`}>
          {this.renderChat()}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
