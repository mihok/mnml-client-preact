import {render, h} from 'preact';
import App from './components/App';


console.log('supu');

// Render the app
var mount = document.getElementById('mount');

render(<App />, mount)
