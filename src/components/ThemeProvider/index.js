import { h, render, Component } from "preact";
import "./styles.css";

class ThemeProvider extends Component {
  getChildContext() {
    console.log("theme provider get child context called", this.props);
    const { children, ...context } = this.props;
    return context;
  }
  render({ children }) {
    return (children && children[0]) || null;
  }
}

export default ThemeProvider;
