import { h, render  } from 'preact';
import './styles.css'
import '../../variables.css'

const ChatBody = props => {

  return (
    <section class={`ChatBody-${props.chatStyle}`}>
      Im the chat body
    </section>
  )
}

export default ChatBody
