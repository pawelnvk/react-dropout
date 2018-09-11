import { shallow } from 'enzyme';
import React from 'react';

import { Consumer } from './context';
import { Referred } from './Referred';
import {
  mergeConditions,
  wrapperHasNoProp,
  wrapperHasProp,
  wrapperIsType,
} from './utils';
import { Wrapper } from './Wrapper';

const getRenderProps = (override = {}) => ({
  incrementedItems: ['item', 'item'],
  items: ['item'],
  registerShadowWrapperRef: jest.fn(),
  registerWrapperRef: jest.fn(),
  ...override,
});

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
      const registerWrapperRef = jest.fn();
      const renderProps = getRenderProps({ registerWrapperRef });
      const instance = getWrapper().instance();

      const Result = () => instance.renderWithShadowElement(renderProps);

      const referred = shallow(<Result />).findWhere(mergeConditions(
        wrapperHasNoProp('style'),
        wrapperIsType(Referred),
      ));
      expect(referred.length).toEqual(1);
      expect(referred.prop('attach')).toEqual(registerWrapperRef);
    });

    it('calls children with items', () => {
      const items = ['item'];
      const renderProps = getRenderProps({ items });
      const children = jest.fn(() => <div />);
      const instance = getWrapper({ children }).instance();

      instance.renderWithShadowElement(renderProps);

      expect(children).toHaveBeenCalledWith(items);
    });
  });

  describe('shadow nodes', () => {
    it('renders Referred', () => {
      const registerShadowWrapperRef = jest.fn();
      const renderProps = getRenderProps({ registerShadowWrapperRef });
      const instance = getWrapper().instance();

      const Result = () => instance.renderWithShadowElement(renderProps);


      const referred = shallow(<Result />).findWhere(mergeConditions(
        wrapperHasProp('style'),
        wrapperIsType(Referred),
      ));
      expect(referred.length).toEqual(1);
      expect(referred.prop('attach')).toEqual(registerShadowWrapperRef);
    });

    it('calls children with incrementedItems', () => {
      const incrementedItems = ['item', 'item'];
      const renderProps = getRenderProps({ incrementedItems });
      const children = jest.fn(() => <div />);
      const instance = getWrapper({ children }).instance();

      instance.renderWithShadowElement(renderProps);

      expect(children).toHaveBeenCalledWith(incrementedItems);
    });
  });
});
