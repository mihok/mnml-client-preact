import { h, render  } from 'preact';
import './styles.css'
import '../../variables.css'
import Message from '../Message/';

const Chat = props => {

  const { chatStyle, toggleChat, messages,
          textBox, handleInput } = props;


  const renderMessages = () => {
    return messages.map(msg => (
      <Message type={msg.author}> {msg.content}</Message>
    ))
  }

  return (
    <section class={`Chat-${chatStyle}`}>

      <header
        class={`Chat__Header-${chatStyle}`}
        onClick={ () => toggleChat(false) }
      >
        Chat with John
      </header>


      {/* Container for text input and reading messages */}
      <div class={`Chat__Body-${chatStyle}`}>
        { renderMessages() }
      </div>


      <form class={`Chat__Form`} onSubmit={props.sendMessage}>
        <input
          class={`Chat__Input-${chatStyle}`}
          placeholder="Type Here"
          onChange={handleInput}
          value={textBox}
        />
      </form>

    </section>
  )
}

export default Chat
