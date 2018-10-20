import { func } from 'prop-types';
import React, { Component } from 'react';

import { Consumer } from './context';

class Rest extends Component {
  renderElements = ({ isRestOpened, restItems }) => {
    const { children } = this.props;

    if (!isRestOpened) return null;

    return children(restItems);
  };

  render() {
    return <Consumer>{this.renderElements}</Consumer>;
  }
}

Rest.propTypes = {
  children: func.isRequired,
};

export { Rest };
