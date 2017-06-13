import { h, render, Component } from 'preact';

const theme = (ComponentToWrap, context) => class ThemeComponent extends Component {
  render () {
    const { theme } = this.context;
    return <ComponentToWrap {...this.props} theme={theme} />;
  }
  };

export default theme;
