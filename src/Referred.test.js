import { mount } from 'enzyme';
import React from 'react';

import { Referred } from './Referred';

const getWrapper = (props = {}) => {
  const defaultProps = {
    attach: jest.fn(),
    children: <div />,
  };

  return mount(<Referred {...defaultProps} {...props} />);
};

describe('Referred', () => {
  it('renders properly', () => {
    const wrapper = getWrapper();

    expect(wrapper.length).toEqual(1);
  });

  it('attaches ref prop to child', () => {
    const attach = jest.fn();
    const children = <div className="element">Text</div>;
    const div = document.createElement('div');
    div.classList = 'element';
    div.innerHTML = 'Text';

    getWrapper({ attach, children });

    expect(attach).toHaveBeenCalledWith(div);
  });
});
