import { h, render, Component } from 'preact';
import './styles.css'
import ChatBody from '../ChatBody/';
import ChatBubble from '../ChatBubble/';

class App extends Component {
  state = {
    chatStyle: 'box',
    chatOpen: false,
  }


  // event handler methods

  openChat = () => {
    this.setState({ chatOpen: true })
  }

  closeChat = () => {
    this.setState({ chatOpen: false })
  }

  // Render Methods (Cleans up actual app component render)

  renderClosedChat = () => {
    return (
      <ChatBubble openChat={this.openChat} />
    )
  }

  renderOpenChat = () => {
    return (
      <div class="App__container">
        <header class={`App__Header-${this.state.chatStyle}`} onClick={this.closeChat}>
          Chat with John from Acme Corp
        </header>

        <ChatBody chatStyle={this.state.chatStyle} />

      </div>
    )
  }

  renderChat = () => {
    return this.state.chatOpen ? this.renderOpenChat() : this.renderClosedChat()
  }

  render () {
    const { chatStyle } = this.state

    return (
      <div class={`App App-${chatStyle}`}>
        { this.renderChat() }
      </div>
    )
  }
}


export default App
