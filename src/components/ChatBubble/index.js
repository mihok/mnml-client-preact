import { h, render, Component } from 'preact';
import './styles.css'

const ChatBubble = props => {
  return (
    <div onClick={() => props.toggleChat(true)} class="ChatBubble">open chat </div>
  )
}

export default ChatBubble
