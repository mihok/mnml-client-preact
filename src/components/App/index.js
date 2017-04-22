import { h, render, Component } from "preact";
import "./styles.css";
import Chat from "../Chat/";
import ChatBubble from "../ChatBubble/";
import dummy from "../../utils/dummy.js/";

class App extends Component {
  state = {
    chatStyle: "box",
    chatOpen: true,
    messages: dummy(4, 5).messages,
    textBox: ""
  };

  // -- Event Handlers -- //

  toggleChat = bool => {
    this.setState({ chatOpen: bool });
  };

  handleInput = e => {
    this.setState({ textBox: e.target.value });
  };

  // -- Message Methods -- //

  sendMessage = e => {
    e.preventDefault();
    this.setState({
      messages: [...this.state.messages, { content: this.state.textBox }],
      textBox: ""
    });
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
    (this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat());

  // -- Component Return -- //

  render() {
    const { chatStyle, chatOpen } = this.state;

    return (
      <div class={`App App-${chatStyle}`}>
        {this.renderChat()}
      </div>
    );
  }
}

export default App;
