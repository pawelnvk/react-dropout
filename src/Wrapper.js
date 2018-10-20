import { func } from 'prop-types';
import React, { Component, Fragment } from 'react';

import { Consumer } from './context';
import { Referred } from './Referred';

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

    return (
      <Fragment>
        <Referred attach={registerWrapperRef}>{children(items)}</Referred>
        <Referred attach={registerShadowWrapperRef} style={style}>
          {children(incrementedItems)}
        </Referred>
      </Fragment>
    );
  };

  render() {
    return <Consumer>{this.renderWithShadowElement}</Consumer>;
  }
}

Wrapper.propTypes = {
  children: func.isRequired,
};

export { Wrapper };
