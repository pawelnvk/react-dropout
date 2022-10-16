import { arrayOf, func, number, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';

import { extendProps, getItemsData } from './utils';

class Dropout extends PureComponent {
  state = {
    countToHide: 0,
  };

  prevWindowWidth = window.innerWidth;

  contentRef = null;

  rootRef = null;

  shadowContentRef = null;

  shadowRootRef = null;

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getRefFor = refName => node => {
    this[refName] = node;
  };

  getContentProps = extendProps({ ref: this.getRefFor('contentRef') });

  getRootProps = extendProps({ ref: this.getRefFor('rootRef') });

  getShadowContentProps = extendProps({
    ref: this.getRefFor('shadowContentRef'),
  });

  getShadowRootProps = extendProps({
    ref: this.getShadowRootRef,
    style: {
      left: '-100%',
      position: 'fixed',
      top: '0px',
      visibility: 'hidden',
      width: '100%',
    },
  });

  handleResize = event => {
    const isTriggeredByEvent = !!event;
    const isShrinking = window.innerWidth < this.prevWindowWidth;

    this.prevWindowWidth = window.innerWidth;

    if (!isTriggeredByEvent) {
      this.handleShrink();
      this.handleGrow();
    } else if (isShrinking) {
      this.handleShrink();
    } else {
      this.handleGrow();
    }
  };

  modifyCountToHide(callback, modificator = 1) {
    this.setState(
      ({ countToHide }) => ({ countToHide: countToHide + modificator }),
      callback,
    );
  }

  handleGrow() {
    const { countToHide } = this.state;
    const { clientWidth: rootWidth } = this.rootRef;
    const { clientWidth: shadowContentWidth } = this.shadowContentRef;
    const hasFreeSpace = rootWidth > shadowContentWidth;

    if (!countToHide || !hasFreeSpace) return;

    this.modifyCountToHide(this.handleGrow, -1);
  }

  handleShrink() {
    const { clientWidth: contentWidth } = this.contentRef;
    const { clientWidth: rootWidth } = this.rootRef;
    const hasExceedingContent = rootWidth <= contentWidth;

    if (!hasExceedingContent) return;

    this.modifyCountToHide(this.handleShrink);
  }

  render() {
    const { children, items } = this.props;
    const { countToHide } = this.state;

    return (
      <Fragment>
        {children({
          ...getItemsData(items, countToHide),
          getContentProps: this.getContentProps,
          getRootProps: this.getRootProps,
        })}

        {children({
          ...getItemsData(items, countToHide - 1),
          getContentProps: this.getShadowContentProps,
          getRootProps: this.getShadowRootProps,
        })}
      </Fragment>
    );
  }
}

Dropout.propTypes = {
  children: func.isRequired,
  items: arrayOf(
    shape({
      grade: number,
    }),
  ),
};

Dropout.defaultProps = {
  items: [],
};

export { Dropout };
