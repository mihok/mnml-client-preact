import { h, render, Component } from 'preact';
import './styles.css'

const ChatBubble = props => {
  return (
    <div onClick={props.openChat} class="ChatBubble">open chat </div>
  )
}

export default ChatBubble
