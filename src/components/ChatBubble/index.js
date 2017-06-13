import { h, render, Component } from 'preact';
import './styles.css';

const ChatBubble = props => (
  <div onClick={() => props.toggleChat(true)} className="ChatBubble">
    <svg
      width="35px"
      height="35px"
      viewBox="0 0 34 32"
      style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"
    >
      <g transform="matrix(1,0,0,1,-319.08,-383.08)">
        <g transform="matrix(1,0,0,1,-9,-97)">
          <g id="Fill-59" transform="matrix(1,0,0,1,328,480)">
            <path
              d="M7,31.92L5.191,31.92L6.256,30.458C7.062,29.353 7.589,27.944 7.859,26.165C2.835,23.919 0.08,19.625 0.08,14C0.08,5.414 6.564,0.08 17,0.08C27.436,0.08 33.92,5.414 33.92,14C33.92,22.716 27.595,27.92 17,27.92C16.764,27.92 16.531,27.914 16.299,27.905C14.71,29.82 11.859,31.92 7,31.92ZM17,1.92C7.558,1.92 1.92,6.436 1.92,14C1.92,20.489 5.88,23.419 9.202,24.734L9.855,24.993L9.777,25.692C9.593,27.35 9.225,28.768 8.659,29.98C12.056,29.557 14.036,27.863 15.135,26.412L15.425,26.029L16.042,26.054C16.359,26.067 16.677,26.08 17,26.08C30.61,26.08 32.08,17.632 32.08,14C32.08,6.436 26.442,1.92 17,1.92Z"
              style="fill:rgb(255,102,102);"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
  );

export default ChatBubble;
