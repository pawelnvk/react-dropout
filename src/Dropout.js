import {
  any,
  arrayOf,
  node,
  objectOf,
} from 'prop-types';
import React, { Component } from 'react';

import { Provider } from './context';
import { Rest } from './Rest';
import { Toggle } from './Toggle';
import { Wrapper } from './Wrapper';

class Dropout extends Component {
  static Rest = Rest

  static Toggle = Toggle

  static Wrapper = Wrapper

  containerRef = null

  prevWindowWidth = window.innerWidth

  toggleRef = null

  shadowWrapperRef = null

  state = {
    countToHide: 0,
    isRestOpened: false,
  }

  wrapperRef = null

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = (event) => {
    const isTriggeredByEvent = !!event;
    const isShrinking = window.innerWidth < this.prevWindowWidth;
    this.prevWindowWidth = window.innerWidth;

    if (!isTriggeredByEvent || isShrinking) {
      this.handleShrink();
    } else {
      this.handleGrow();
    }
  }

  registerContainerRef = (ref) => {
    this.containerRef = ref;
  }

  registerShadowWrapperRef = (ref) => {
    this.shadowWrapperRef = ref;
  }

  registerToggleRef = (ref) => {
    this.toggleRef = ref;
  }

  registerWrapperRef = (ref) => {
    this.wrapperRef = ref;
  }

  toggleRest = () => {
    this.setState(({ isRestOpened }) => ({ isRestOpened: !isRestOpened }));
  }

  decreaseCountToHide(callback) {
    this.setState(({ countToHide }) => ({ countToHide: countToHide - 1 }), callback);
  }

  increaseCountToHide(callback) {
    this.setState(({ countToHide }) => ({ countToHide: countToHide + 1 }), callback);
  }

  handleGrow() {
    const { countToHide } = this.state;
    const { clientWidth: containerWidth } = this.containerRef;
    const { clientWidth: shadowWrapperWidth } = this.shadowWrapperRef;

    if (!countToHide) return;

    const { clientWidth } = this.toggleRef;
    const hasSpaceForLink = containerWidth > shadowWrapperWidth;
    const hasSpaceForLinkWithoutToggle = containerWidth > shadowWrapperWidth - clientWidth;
    const isGroupHidden = countToHide > 1;
    const isOneHidden = countToHide === 1;

    const isMiddleTransition = isGroupHidden && hasSpaceForLink;
    const isLastTransition = isOneHidden && hasSpaceForLinkWithoutToggle;

    if (isMiddleTransition || isLastTransition) {
      this.decreaseCountToHide(this.handleGrow);
    }
  }

  handleShrink() {
    const { clientWidth: containerWidth } = this.containerRef;
    const { clientWidth: wrapperWidth } = this.wrapperRef;

    if (containerWidth <= wrapperWidth) {
      this.increaseCountToHide(this.handleShrink);
    }
  }

  render() {
    const { children, items } = this.props;
    const { countToHide, isRestOpened } = this.state;
    const element = React.Children.only(children);
    const elementWithRef = React.cloneElement(element, { ref: this.registerContainerRef });
    const rangeIndex = items.length - countToHide;

    return (
      <Provider
        value={{
          countToHide,
          incrementedItems: items.slice(0, rangeIndex + 1),
          isRestOpened,
          items: items.slice(0, rangeIndex),
          registerToggleRef: this.registerToggleRef,
          registerShadowWrapperRef: this.registerShadowWrapperRef,
          registerWrapperRef: this.registerWrapperRef,
          restItems: items.slice(rangeIndex),
          toggleRest: this.toggleRest,
        }}
      >
        {elementWithRef}
      </Provider>
    );
  }
}

Dropout.propTypes = {
  children: node.isRequired,
  items: arrayOf(objectOf(any)).isRequired,
};

export { Dropout };