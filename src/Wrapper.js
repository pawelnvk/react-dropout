import { func } from 'prop-types';
import React, { Component, Fragment } from 'react';

import { Consumer } from './context';

const style = {
  left: '-100%',
  position: 'fixed',
  top: 0,
  visibility: 'hidden',
};

class Wrapper extends Component {
  renderWithShadowElement = ({
    incrementedItems,
    items,
    registerShadowWrapperRef,
    registerWrapperRef,
  }) => {
    const { children } = this.props;
    const element = React.cloneElement(children(items), { ref: registerWrapperRef });
    const shadowElement = React.cloneElement(children(incrementedItems), {
      ref: registerShadowWrapperRef,
      style,
    });

    return (
      <Fragment>
        {element}
        {shadowElement}
      </Fragment>
    );
  }

  render() {
    return (
      <Consumer>{this.renderWithShadowElement}</Consumer>
    );
  }
}

Wrapper.propTypes = {
  children: func.isRequired,
};

export { Wrapper };
