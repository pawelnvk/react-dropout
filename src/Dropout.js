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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const isShrinking = window.innerWidth < this.prevWindowWidth;
    this.prevWindowWidth = window.innerWidth;

    const { countToHide } = this.state;
    const { clientWidth: containerWidth } = this.containerRef;
    const { clientWidth: shadowWrapperWidth } = this.shadowWrapperRef;
    const { clientWidth: wrapperWidth } = this.wrapperRef;

    if (isShrinking) {
      if (containerWidth <= wrapperWidth) {
        this.increaseCountToHide();
      }
    } else if (countToHide) {
      if (countToHide > 1) {
        if (containerWidth > shadowWrapperWidth) {
          this.decreaseCountToHide();
        }
      } else if (containerWidth > shadowWrapperWidth - this.toggleRef.clientWidth) {
        this.decreaseCountToHide();
      }
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

  decreaseCountToHide() {
    this.setState(({ countToHide }) => ({ countToHide: countToHide - 1 }));
  }

  increaseCountToHide() {
    this.setState(({ countToHide }) => ({ countToHide: countToHide + 1 }));
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
