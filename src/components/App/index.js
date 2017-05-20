import { h, render, Component } from "preact";
import "./styles.css";
import Chat from "../Chat/";
import ChatBubble from "../ChatBubble/";
import dummy from "../../utils/dummy.js/";
import ThemeProvider from "../ThemeProvider/index";
/* import io from "socket.io-client";*/
// NOTE: SOCKET IS LOADED IN THE EXAMPLE SITE BECASUE ROLLUP IS FAILING AT IMPORTING IO
// SAD sAD FAIL SAD ADAAA SAD

const socketPath = "http://localhost:8000";

class App extends Component {
  state = {
    chatStyle: "box", // NOTE: deprecated
    chatOpen: true,
    messages: dummy(4, 5).messages,
    textBox: "",
    theme: "Messenger" // wrapped with theme provider + HOC
  };

  componentDidMount() {
    window.jam = this;
    this.socket = io.connect(socketPath, {
      reconnectionAttempts: 10,
      query: "type=client"
    });
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
  //  Message Methods
  // ====================================

  // TODO: combine last message if it's by the same author
  sendMessage = e => {
    e.preventDefault();
    if (this.state.textBox === "") return;
    this.socket.emit("client:message", this.state.textBox);

    this.setState({
      messages: [...this.state.messages, { content: [this.state.textBox] }],
      textBox: ""
    });
  };

  // if the last message was from the same author, combine 'em.
  combineLastMessage = msg => {
    if (msg.author !== previousMsg.author) return;
    var messages = this.state.messages;
    var lastMessage = messages[messages[messages.length - 1]];

    previousMsg.content.concat(msg.content);
    return previousMsg;
  };

  // -- Render Methods -> Component Pieces -- //

  renderClosedChat = () => <ChatBubble toggleChat={this.toggleChat} />;

  renderOpenChat = () => (
    <Chat
      chatStyle={this.state.chatStyle}
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

  render() {
    const { chatStyle, chatOpen, theme } = this.state;

    return (
      <ThemeProvider theme={this.state.theme}>
        <div class={`App App__${theme}`}>
          {this.renderChat()}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
