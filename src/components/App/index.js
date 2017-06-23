import { h, render, Component } from "preact";
import "./styles.css";
import Chat from "../Chat/";
import ChatBubble from "../ChatBubble/";
import ThemeProvider from "../ThemeProvider/index"; // socket io doesn't properly import from webpack?
/* import io from "socket.io-client";*/ const io = window.io || {};

const socketPath = `http://${process.env.REMOTE_HOST || 'localhost'}:8000`;

class App extends Component {
  state = {
    chatOpen: true,
    messages: [],
    textBox: "",
    theme: "Messenger" // wrapped with theme provider + HOC
  };

  componentDidMount() {
    window.jam = this;
    this.socket = io.connect(socketPath, {
      reconnectionAttempts: 10,
      query: "type=client"
    });

    this.socket.on("operator:message", this.recieveMessage);
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
  /** Send Message
   * @summary - Allow a user to send a message and save to local react state.
   * @description - Will either save a single message to the messages array or will 
   * will combine with previous messages if it can.
   * @param {object} e - event object; used to prevent refreshing the page
   */
  sendMessage = e => {
    // standard starter stuff, set up vars, conditional returns etc.
    e.preventDefault(); // must be the first thing to happen
    if (this.state.textBox === "") return;
    let msg = this.formatMessage(this.state.textBox);
    let messageCombined = this.combineLastMessage(msg);

    // "sending" messages: store in local component state and emit over sockets
    this.socket.emit("client:message", JSON.stringify(msg));

    // save the message to local stage: either combining them or not.
    if (this.combineLastMessage(msg)) {
      let messages = this.state.messages;
      messages[messages.length - 1].content.push(...msg.content);
      this.setState({
        messages: messages,
        textBox: ""
      });
    } else {
      this.setState({
        messages: [...this.state.messages, msg],
        textBox: ""
      });
    }
  };

  recieveMessage = data => {
    this.setState({
      messages: [
        ...this.state.messages,
        { content: [data], author: "operator" }
      ]
    });
  };

  /** Format Message
   * @description: Formats a message to a proper object with metadata
   * @param {msg}: takes a plain ol' string that is a chat message
   * @returns {obj} with timestamp, author data, and content.
   */
  formatMessage(msg) {
    return {
      timestamp: Date.now(),
      // message are an [] so -> can be combined on next message if same author.
      content: [msg],
      author: "client"
    };
  }

  /**
   * @summary Checks if message can combine with prev. message in local state.
   * @param {object} msg - A message from a user
   * @returns {boolean}
   */
  combineLastMessage = msg => {
    const previousMessage = this.state.messages[this.state.messages.length - 1];
    if (!previousMessage) return; // return if this is the first message in the conversation
    if (msg.author !== previousMessage.author) {
      console.log("the last message -> different author from current msg");
      return false;
    }
    return true;
  };

  renderClosedChat = () => <ChatBubble toggleChat={this.toggleChat} />;

  renderOpenChat = () =>
    <Chat
      toggleChat={this.toggleChat}
      messages={this.state.messages}
      textBox={this.state.textBox}
      handleInput={this.handleInput}
      sendMessage={this.sendMessage}
    />;

  renderChat = () =>
    this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat();

  // -- Component Return -- //

  render() {
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
