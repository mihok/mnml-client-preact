import { h, render, Component } from 'preact';
import './styles.css'
import Chat from '../Chat/';
import ChatBubble from '../ChatBubble/';
import dummy from '../../utils/dummy.js/';

class App extends Component {

  state = {
    chatStyle: 'box',
    chatOpen: true ,
    messages: dummy(4, 5).messages
  }


  // event handler methods

  toggleChat = (bool) => {
    this.setState({chatOpen: bool})
  }

  componentDidMount() {
    window.App = this;
  }

  // Render Methods (Cleans up actual app component render)

  renderClosedChat = () => (
    <ChatBubble toggleChat={this.toggleChat} />
  )

  renderOpenChat = () => (
    <Chat chatStyle={this.state.chatStyle} toggleChat={this.toggleChat}/>
  )

  renderChat = () => (
    this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat()
  )


  render () {
    const { chatStyle, chatOpen } = this.state

    return (
      <div class={`App App-${chatStyle}`}>
        {this.renderChat() }
      </div>
    )
  }
}


export default App
