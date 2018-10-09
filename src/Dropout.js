import {
  arrayOf,
  node,
  number,
  shape,
} from 'prop-types';
import React, { Component } from 'react';

import { Provider } from './context';
import { Rest } from './Rest';
import { Toggle } from './Toggle';
import { Wrapper } from './Wrapper';
import { Referred } from './Referred';
import { getItemsIdsByGrades, hasIndex } from './utils';

class Dropout extends Component {
  static Rest = Rest

  static Toggle = Toggle

  static Wrapper = Wrapper

  containerRef = {}

  prevWindowWidth = window.innerWidth

  shadowWrapperRef = {}

  state = {
    countToHide: 0,
    isRestOpened: false,
  }

  toggleRef = {}

  wrapperRef = {}

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
    const rangeIndex = items.length - countToHide;
    const idsByGrades = getItemsIdsByGrades(items);
    const incrementedIds = idsByGrades.slice(0, rangeIndex + 1);
    const ids = idsByGrades.slice(0, rangeIndex);
    const restIds = idsByGrades.slice(rangeIndex);

    return (
      <Provider
        value={{
          countToHide,
          incrementedItems: items.filter(hasIndex(incrementedIds)),
          isRestOpened,
          items: items.filter(hasIndex(ids)),
          registerToggleRef: this.registerToggleRef,
          registerShadowWrapperRef: this.registerShadowWrapperRef,
          registerWrapperRef: this.registerWrapperRef,
          restItems: items.filter(hasIndex(restIds)),
          toggleRest: this.toggleRest,
        }}
      >
        <Referred attach={this.registerContainerRef}>
          {element}
        </Referred>
      </Provider>
    );
  }
}

Dropout.propTypes = {
  children: node.isRequired,
  items: arrayOf(shape({
    grade: number,
  })),
};

Dropout.defaultProps = {
  items: [],
};

export { Dropout };
