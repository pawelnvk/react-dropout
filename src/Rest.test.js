import { shallow } from 'enzyme';
import React from 'react';

import { Consumer } from './context';
import { Rest } from './Rest';

const getWrapper = (props = {}) => {
  const defaultProps = {
    children: () => <div />,
  };

  return shallow(<Rest {...defaultProps} {...props} />);
};

describe('Rest', () => {
  it('renders properly', () => {
    const wrapper = getWrapper();

    expect(wrapper.length).toEqual(1);
  });

  it('contains Consumer', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Consumer).length).toEqual(1);
  });

  it('returns null if rest is not opened', () => {
    const instance = getWrapper().instance();

    const result = instance.renderElements({ isRestOpened: false });

    expect(result).toBeNull();
  });

  it('calls children with restItems if rest is opened', () => {
    const children = jest.fn();
    const restItems = ['some item'];
    const instance = getWrapper({ children }).instance();

    instance.renderElements({ isRestOpened: true, restItems });

    expect(children).toHaveBeenCalledWith(restItems);
  });
});
