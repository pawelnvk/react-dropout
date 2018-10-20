import { shallow } from 'enzyme';
import React from 'react';

import { Consumer } from './context';
import { Referred } from './Referred';
import { Toggle } from './Toggle';

const getWrapper = (props = {}) => {
  const defaultProps = {
    children: () => <div />,
  };

  return shallow(<Toggle {...defaultProps} {...props} />);
};

describe('Toggle', () => {
  it('renders properly', () => {
    const wrapper = getWrapper();

    expect(wrapper.length).toEqual(1);
  });

  it('contains Consumer', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Consumer).length).toEqual(1);
  });

  it('returns null if count to hide is equal to 0', () => {
    const instance = getWrapper().instance();

    const result = instance.renderToggle({ countToHide: 0 });

    expect(result).toBeNull();
  });

  it('renders Referred if there is count to hide', () => {
    const countToHide = 1;
    const isRestOpened = false;
    const registerToggleRef = jest.fn();
    const toggleRest = jest.fn();
    const children = jest.fn(() => <div />);
    const instance = getWrapper({ children }).instance();

    const Result = () =>
      instance.renderToggle({
        countToHide,
        isRestOpened,
        registerToggleRef,
        toggleRest,
      });

    const referred = shallow(<Result />).find(Referred);
    expect(referred.length).toEqual(1);
    expect(referred.prop('attach')).toEqual(registerToggleRef);
  });

  it('calls children with isToggled and toggle if there is count to hide', () => {
    const countToHide = 1;
    const isRestOpened = false;
    const registerToggleRef = jest.fn();
    const toggleRest = jest.fn();
    const children = jest.fn(() => <div />);
    const instance = getWrapper({ children }).instance();

    instance.renderToggle({
      countToHide,
      isRestOpened,
      registerToggleRef,
      toggleRest,
    });

    expect(children).toHaveBeenCalledWith({
      isToggled: isRestOpened,
      toggle: toggleRest,
    });
  });
});
