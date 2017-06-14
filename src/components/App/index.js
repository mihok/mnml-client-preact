import { h, render, Component } from 'preact';
import './styles.css';
import Chat from '../Chat/';
import ChatBubble from '../ChatBubble/';
import ThemeProvider from '../ThemeProvider/index';
/* import dummy from '../../../lib/dummy';*/
/* import io from "socket.io-client";*/ // socket io doesn't properly import from webpack?
const io = window.io || {}

const socketPath = 'http://localhost:8000';

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
      reconnectionAttempts: 10,
      query: 'type=client',
    });

    this.socket.on('operator:message', this.recieveMessage);
  }

  // ====================================
  // Event Handlers
  // ====================================

  toggleChat = (bool) => {
    this.setState({ chatOpen: bool });
  };

  handleInput = (e) => {
    this.setState({ textBox: e.target.value });
  };

  // ====================================
  //  Message Methods
  // ====================================

  // TODO: combine last message if it's by the same author
  sendMessage = (e) => {
    e.preventDefault();

    if (this.state.textBox === '') return;

    this.socket.emit('client:message', this.state.textBox);

    this.setState({
      messages: [...this.state.messages, { content: [this.state.textBox], author: 'client' }],
      textBox: '',
    });
  };

  recieveMessage = (data) => {
    this.setState({
      messages: [...this.state.messages, { content: [data], author: 'operator' }],
    });
  };


  // TODO:
  // if the last message was from the same author, combine 'em.
  // combineLastMessage = (msg) => {
  //   if (msg.author !== previousMsg.author) return;
  //   const messages = this.state.messages;
  //   const lastMessage = messages[messages[messages.length - 1]];

  //   previousMsg.content.concat(msg.content);
  //   return previousMsg;
  // };

  // -- Render Methods -> Component Pieces -- //

  renderClosedChat = () => <ChatBubble toggleChat={this.toggleChat} />;

  renderOpenChat = () => (
    <Chat
      toggleChat={this.toggleChat}
      messages={this.state.messages}
      textBox={this.state.textBox}
      handleInput={this.handleInput}
      sendMessage={this.sendMessage}
    />
  );

  renderChat = () =>
    this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat();

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
