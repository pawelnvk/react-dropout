import { shallow } from 'enzyme';
import React from 'react';

import { Consumer } from './context';
import { Referred } from './Referred';
import { Wrapper } from './Wrapper';

const getWrapper = (props = {}) => {
  const defaultProps = {
    children: () => <div />,
  };

  return shallow(<Wrapper {...defaultProps} {...props} />);
};

describe('Wrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders properly', () => {
    const wrapper = getWrapper();

    expect(wrapper.length).toEqual(1);
  });

  it('contains Consumer', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Consumer).length).toEqual(1);
  });

  describe('actual nodes', () => {
    it('renders Referred', () => {
      const incrementedItems = ['item', 'item'];
      const items = ['item'];
      const registerShadowWrapperRef = jest.fn();
      const registerWrapperRef = jest.fn();
      const children = jest.fn(() => <div />);
      const instance = getWrapper({ children }).instance();

      const Result = () => instance.renderWithShadowElement({
        incrementedItems,
        items,
        registerShadowWrapperRef,
        registerWrapperRef,
      });

      const referred = shallow(<Result />).findWhere((innerWrapper) => {
        const hasReferredType = innerWrapper.type() === Referred;
        const hasNoStyles = !innerWrapper.prop('style');

        return hasReferredType && hasNoStyles;
      });
      expect(referred.length).toEqual(1);
      expect(referred.prop('attach')).toEqual(registerWrapperRef);
    });

    it('calls children with items', () => {
      const incrementedItems = ['item', 'item'];
      const items = ['item'];
      const registerShadowWrapperRef = jest.fn();
      const registerWrapperRef = jest.fn();
      const children = jest.fn(() => <div />);
      const instance = getWrapper({ children }).instance();

      instance.renderWithShadowElement({
        incrementedItems,
        items,
        registerShadowWrapperRef,
        registerWrapperRef,
      });

      expect(children).toHaveBeenCalledWith(items);
    });
  });

  describe('shadow nodes', () => {
    it('renders Referred', () => {
      const incrementedItems = ['item', 'item'];
      const items = ['item'];
      const registerShadowWrapperRef = jest.fn();
      const registerWrapperRef = jest.fn();
      const children = jest.fn(() => <div />);
      const instance = getWrapper({ children }).instance();

      const Result = () => instance.renderWithShadowElement({
        incrementedItems,
        items,
        registerShadowWrapperRef,
        registerWrapperRef,
      });

      const referred = shallow(<Result />).findWhere((innerWrapper) => {
        const hasReferredType = innerWrapper.type() === Referred;
        const hasNoStyles = innerWrapper.prop('style');

        return hasReferredType && hasNoStyles;
      });
      expect(referred.length).toEqual(1);
      expect(referred.prop('attach')).toEqual(registerShadowWrapperRef);
    });

    it('calls children with incrementedItems', () => {
      const incrementedItems = ['item', 'item'];
      const items = ['item'];
      const registerShadowWrapperRef = jest.fn();
      const registerWrapperRef = jest.fn();
      const children = jest.fn(() => <div />);
      const instance = getWrapper({ children }).instance();

      instance.renderWithShadowElement({
        incrementedItems,
        items,
        registerShadowWrapperRef,
        registerWrapperRef,
      });

      expect(children).toHaveBeenCalledWith(incrementedItems);
    });
  });
});
