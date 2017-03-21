import { h, render  } from 'preact';
import './styles.css'
import '../../variables.css'

const Chat = props => {
  const {chatStyle, toggleChat} = props;

  return (
    <section class={`Chat-${chatStyle}`}>

      <header
        class={`Chat__Header-${chatStyle}`}
        onClick={() => toggleChat(false)}
      >
        Chat with John
      </header>

      <div class={`Chat__Body-${chatStyle}`}>Im the chat body</div>

    </section>
  )
}

export default Chat
