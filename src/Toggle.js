import { func } from 'prop-types';
import React, { Component } from 'react';

import { Consumer } from './context';

class Toggle extends Component {
  renderToggle = ({
    countToHide,
    isRestOpened,
    registerToggleRef,
    toggleRest,
  }) => {
    const { children } = this.props;

    if (!countToHide) return null;

    const element = children({ isToggled: isRestOpened, toggle: toggleRest });
    const elementWithRef = React.cloneElement(element, { ref: registerToggleRef });

    return elementWithRef;
  }

  render() {
    return (
      <Consumer>{this.renderToggle}</Consumer>
    );
  }
}

Toggle.propTypes = {
  children: func.isRequired,
};

export { Toggle };
