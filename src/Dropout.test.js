import { mount } from 'enzyme';
import React from 'react';

import { Dropout } from './Dropout';

const getWrapper = (props = {}) => {
  const defaultProps = {
    _isCallbackBlocked: true,
    children: ({ getContentProps, getRootProps }) => (
      <div {...getRootProps()}>
        <div {...getContentProps()} />
      </div>
    ),
  };

  return mount(<Dropout {...defaultProps} {...props} />);
};

const getInstance = () => getWrapper().instance();

describe('Dropout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders properly', () => {
    const wrapper = getWrapper();

    expect(wrapper).toHaveLength(1);
  });

  it('passes proper args to children func', () => {
    const children = jest.fn(({ getContentProps, getRootProps }) => (
      <div {...getRootProps()}>
        <div {...getContentProps()} />
      </div>
    ));
    const items = [{ grade: 5, name: 'Text' }];
    const expected = expect.objectContaining({
      countToHide: expect.any(Number),
      items,
      exceedingItems: expect.any(Array),
      getContentProps: expect.any(Function),
      getRootProps: expect.any(Function),
    });

    getWrapper({ children, items });

    expect(children).toBeCalledWith(expected);
  });

  describe('handleResize', () => {
    it('is called on mount', () => {
      const instance = getInstance();
      const handleResize = jest.spyOn(instance, 'handleResize');

      instance.componentDidMount();

      expect(handleResize).toHaveBeenCalled();
    });

    it('is attached to window on mount', () => {
      const addEventListener = jest.spyOn(window, 'addEventListener');

      const instance = getInstance();

      expect(addEventListener).toHaveBeenCalledWith(
        'resize',
        instance.handleResize,
      );
    });

    it('is dettached from window on unmount', () => {
      const removeEventListener = jest.spyOn(window, 'removeEventListener');
      const wrapper = getWrapper();
      const instance = wrapper.instance();

      wrapper.unmount();

      expect(removeEventListener).toHaveBeenCalledWith(
        'resize',
        instance.handleResize,
      );
    });

    it('calls both actions if no event provided', () => {
      const instance = getInstance();
      const handleGrow = jest.spyOn(instance, 'handleGrow');
      const handleShrink = jest.spyOn(instance, 'handleShrink');

      instance.handleResize();

      expect(handleGrow).toHaveBeenCalled();
      expect(handleShrink).toHaveBeenCalled();
    });

    it('calls handleShrink if window is shrinking', () => {
      const event = {};
      const instance = getInstance();
      const handleShrink = jest.spyOn(instance, 'handleShrink');
      instance.prevWindowWidth = 100;
      window.innerWidth = 90;

      instance.handleResize(event);

      expect(handleShrink).toHaveBeenCalled();
    });

    it('calls handleGrow if window is shrinking', () => {
      const event = {};
      const instance = getInstance();
      const handleGrow = jest.spyOn(instance, 'handleGrow');
      instance.prevWindowWidth = 90;
      window.innerWidth = 100;

      instance.handleResize(event);

      expect(handleGrow).toHaveBeenCalled();
    });
  });

  describe('countToHide', () => {
    it('is initially set to 0', () => {
      const instance = new Dropout();

      expect(instance.state.countToHide).toEqual(0);
    });

    describe('modifyCountToHide', () => {
      it('increases countToHide by default', () => {
        const wrapper = getWrapper();
        const instance = wrapper.instance();
        instance.state.countToHide = 0;

        instance.modifyCountToHide();

        expect(wrapper.state('countToHide')).toEqual(1);
      });

      it('modifies countToHide by given number', () => {
        const modificator = -1;
        const wrapper = getWrapper();
        const instance = wrapper.instance();
        instance.state.countToHide = 0;

        instance.modifyCountToHide(jest.fn(), modificator);

        expect(wrapper.state('countToHide')).toEqual(modificator);
      });
    });
  });

  describe('handleShrink', () => {
    it('calls modifyCountToHide if wrapper width meets container width', () => {
      const instance = getInstance();
      const modifyCountToHide = jest
        .spyOn(instance, 'modifyCountToHide')
        .mockImplementation(() => null);
      instance.rootRef = { clientWidth: 700 };
      instance.contentRef = { clientWidth: 700 };

      instance.handleShrink();

      expect(modifyCountToHide).toHaveBeenCalledWith(instance.handleShrink);
    });

    it('does not call modifyCountToHide if wrapper width is less than container width', () => {
      const instance = getInstance();
      const modifyCountToHide = jest.spyOn(instance, 'modifyCountToHide');
      instance.rootRef = { clientWidth: 700 };
      instance.contentRef = { clientWidth: 600 };

      instance.handleShrink();

      expect(modifyCountToHide).not.toHaveBeenCalledWith(instance.handleShrink);
    });
  });

  describe('handleGrow', () => {
    it('does not call modifyCountToHide if there is no elements to hide', () => {
      const instance = getInstance();
      const modifyCountToHide = jest.spyOn(instance, 'modifyCountToHide');
      instance.state.countToHide = 0;

      instance.handleGrow();

      expect(modifyCountToHide).not.toHaveBeenCalledWith(instance.handleGrow);
    });

    it('calls modifyCountToHide in the middle transition if shadowWrapper width is lower than container width', () => {
      const instance = getInstance();
      const modifyCountToHide = jest
        .spyOn(instance, 'modifyCountToHide')
        .mockImplementation(() => null);
      instance.rootRef = { clientWidth: 800 };
      instance.shadowContentRef = { clientWidth: 700 };
      instance.state.countToHide = 2;

      instance.handleGrow();

      expect(modifyCountToHide).toHaveBeenCalledWith(instance.handleGrow, -1);
    });
  });
});
