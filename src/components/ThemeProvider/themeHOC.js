import { h, render, Component } from 'preact';

const themer = (ComponentToWrap, context) => class ThemeComponent extends Component { // eslint-disable-line
  render () {
    const { theme } = this.context;
    return <ComponentToWrap {...this.props} theme={theme} />;
  }
  };

export default themer;
