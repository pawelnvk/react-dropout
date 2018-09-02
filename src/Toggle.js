import { func } from 'prop-types';
import React, { Component } from 'react';

import { Consumer } from './context';
import { Referred } from './Referred';

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

    return (
      <Referred attach={registerToggleRef}>{element}</Referred>
    );
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
