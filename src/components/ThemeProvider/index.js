import { Component } from 'preact';
import PropTypes from 'prop-types';

import './styles.css';

class ThemeProvider extends Component {
  propTypes = {
    children: PropTypes.element,
  };

  getChildContext () {
    const { ...context } = this.props;
    return context;
  }
  render ({ children }) {
    return (children && children[0]) || null;
  }
}

export default ThemeProvider;
