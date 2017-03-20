import { h, render, Component } from 'preact';
import './styles.css'
import ChatBody from '../ChatBody/'

class App extends Component {
  state = {
    chatStyle: 'box',
    chatOpen: false,
  }

  render () {
    const { chatStyle } = this.state

    return (
      <div class={`App App-${chatStyle}`}>
        <header class={`App__Header-${chatStyle}`}>Chat with John from Acme Corp</header>
        <ChatBody chatStyle={chatStyle} />
      </div>
    )
  }
}


export default App
