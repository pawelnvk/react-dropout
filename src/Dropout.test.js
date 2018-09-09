import { shallow } from 'enzyme';
import React from 'react';

import { Dropout } from './Dropout';
import { Provider } from './context';
import { Referred } from './Referred';

const getWrapper = (props = {}) => {
  const defaultProps = {
    children: <div />,
  };

  return shallow(<Dropout {...defaultProps} {...props} />);
};

describe('Dropout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders properly', () => {
    const wrapper = getWrapper();

    expect(wrapper.length).toEqual(1);
  });

  describe('Provider', () => {
    it('is present', () => {
      const wrapper = getWrapper();

      expect(wrapper.find(Provider).length).toEqual(1);
    });

    it('passes value', () => {
      const expected = expect.objectContaining({
        countToHide: expect.any(Number),
        incrementedItems: expect.any(Array),
        isRestOpened: expect.any(Boolean),
        items: expect.any(Array),
        registerToggleRef: expect.any(Function),
        registerShadowWrapperRef: expect.any(Function),
        registerWrapperRef: expect.any(Function),
        restItems: expect.any(Array),
        toggleRest: expect.any(Function),
      });

      const wrapper = getWrapper();

      expect(wrapper.find(Provider).prop('value')).toEqual(expected);
    });
  });

  describe('Referred', () => {
    it('is present', () => {
      const wrapper = getWrapper();

      expect(wrapper.find(Referred).length).toEqual(1);
    });

    it('passes attach', () => {
      const wrapper = getWrapper();

      const { registerContainerRef } = wrapper.instance();
      expect(wrapper.find(Referred).prop('attach')).toEqual(registerContainerRef);
    });
  });

  describe('handleResize', () => {
    it('is called on mount', () => {
      const instance = getWrapper().instance();
      const handleResize = jest.spyOn(instance, 'handleResize');

      instance.componentDidMount();

      expect(handleResize).toHaveBeenCalled();
    });

    it('is attached to window on mount', () => {
      const addEventListener = jest.spyOn(window, 'addEventListener');

      const instance = getWrapper().instance();

      expect(addEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
    });

    it('is dettached from window on unmount', () => {
      const removeEventListener = jest.spyOn(window, 'removeEventListener');
      const wrapper = getWrapper();
      const instance = wrapper.instance();

      wrapper.unmount();

      expect(removeEventListener).toHaveBeenCalledWith('resize', instance.handleResize);
    });

    it('calls handleShrink if no event provided', () => {
      const instance = getWrapper().instance();
      const handleShrink = jest.spyOn(instance, 'handleShrink');

      instance.handleResize();

      expect(handleShrink).toHaveBeenCalled();
    });

    it('calls handleShrink if window is shrinking', () => {
      const event = {};
      const instance = getWrapper().instance();
      const handleShrink = jest.spyOn(instance, 'handleShrink');
      instance.prevWindowWidth = 100;
      window.innerWidth = 90;

      instance.handleResize(event);

      expect(handleShrink).toHaveBeenCalled();
    });

    it('calls handleGrow if window is shrinking', () => {
      const event = {};
      const instance = getWrapper().instance();
      const handleGrow = jest.spyOn(instance, 'handleGrow');
      instance.prevWindowWidth = 90;
      window.innerWidth = 100;

      instance.handleResize(event);

      expect(handleGrow).toHaveBeenCalled();
    });
  });

  describe('references', () => {
    it('adds container ref', () => {
      const instance = getWrapper().instance();
      const ref = window;

      instance.registerContainerRef(ref);

      expect(instance.containerRef).toEqual(ref);
    });

    it('adds shadow wrapper ref', () => {
      const instance = getWrapper().instance();
      const ref = window;

      instance.registerShadowWrapperRef(ref);

      expect(instance.shadowWrapperRef).toEqual(ref);
    });

    it('adds toggle ref', () => {
      const instance = getWrapper().instance();
      const ref = window;

      instance.registerToggleRef(ref);

      expect(instance.toggleRef).toEqual(ref);
    });

    it('adds wrapper ref', () => {
      const instance = getWrapper().instance();
      const ref = window;

      instance.registerWrapperRef(ref);

      expect(instance.wrapperRef).toEqual(ref);
    });
  });

  describe('isRestOpened', () => {
    it('is initially set to false', () => {
      const wrapper = getWrapper();

      expect(wrapper.state('isRestOpened')).toEqual(false);
    });

    it('switches isRestOpened when calling toggleRest between false and true', () => {
      const wrapper = getWrapper();
      const instance = wrapper.instance();

      instance.toggleRest();

      expect(wrapper.state('isRestOpened')).toEqual(true);
    });

    it('switches isRestOpened when calling toggleRest between true and false', () => {
      const wrapper = getWrapper();
      const instance = wrapper.instance();

      instance.toggleRest();
      instance.toggleRest();

      expect(wrapper.state('isRestOpened')).toEqual(false);
    });
  });

  describe('countToHide', () => {
    it('is initially set to 0', () => {
      const wrapper = getWrapper();

      expect(wrapper.state('countToHide')).toEqual(0);
    });

    describe('decreaseCountToHide', () => {
      it('decreases countToHide', () => {
        const wrapper = getWrapper();
        const instance = wrapper.instance();

        instance.decreaseCountToHide();

        expect(wrapper.state('countToHide')).toEqual(-1);
      });

      it('calls callback if passed', () => {
        const callback = jest.fn();
        const wrapper = getWrapper();
        const instance = wrapper.instance();

        instance.decreaseCountToHide(callback);

        expect(callback).toHaveBeenCalled();
      });
    });

    describe('increaseCountToHide', () => {
      it('decreases countToHide', () => {
        const wrapper = getWrapper();
        const instance = wrapper.instance();

        instance.increaseCountToHide();

        expect(wrapper.state('countToHide')).toEqual(1);
      });

      it('calls callback if passed', () => {
        const callback = jest.fn();
        const wrapper = getWrapper();
        const instance = wrapper.instance();

        instance.increaseCountToHide(callback);

        expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe('handleShrink', () => {
    it('calls increaseCountToHide if wrapper width meets container width', () => {
      const instance = getWrapper().instance();
      const increaseCountToHide = jest.spyOn(instance, 'increaseCountToHide')
        .mockImplementation(() => null);
      instance.containerRef = { clientWidth: 700 };
      instance.wrapperRef = { clientWidth: 700 };

      instance.handleShrink();

      expect(increaseCountToHide).toHaveBeenCalledWith(instance.handleShrink);
    });

    it('does not call increaseCountToHide if wrapper width is less than container width', () => {
      const instance = getWrapper().instance();
      const increaseCountToHide = jest.spyOn(instance, 'increaseCountToHide');
      instance.containerRef = { clientWidth: 700 };
      instance.wrapperRef = { clientWidth: 600 };

      instance.handleShrink();

      expect(increaseCountToHide).not.toHaveBeenCalledWith(instance.handleShrink);
    });
  });

  describe('handleGrow', () => {
    it('does not call decreaseCountToHide if there is no elements to hide', () => {
      const instance = getWrapper().instance();
      const decreaseCountToHide = jest.spyOn(instance, 'decreaseCountToHide');
      instance.state.countToHide = 0;

      instance.handleGrow();

      expect(decreaseCountToHide).not.toHaveBeenCalledWith(instance.handleGrow);
    });

    it('calls decreaseCountToHide in the middle transition if shadowWrapper width is lower than container width', () => {
      const instance = getWrapper().instance();
      const decreaseCountToHide = jest.spyOn(instance, 'decreaseCountToHide')
        .mockImplementation(() => null);
      instance.containerRef = { clientWidth: 800 };
      instance.shadowWrapperRef = { clientWidth: 700 };
      instance.state.countToHide = 2;
      instance.toggleRef = { clientWidth: 100 };

      instance.handleGrow();

      expect(decreaseCountToHide).toHaveBeenCalledWith(instance.handleGrow);
    });

    it('calls decreaseCountToHide in the last transition if difference between shadowWrapper width and toggle width is lower than container width', () => {
      const instance = getWrapper().instance();
      const decreaseCountToHide = jest.spyOn(instance, 'decreaseCountToHide')
        .mockImplementation(() => null);
      instance.containerRef = { clientWidth: 900 };
      instance.shadowWrapperRef = { clientWidth: 700 };
      instance.state.countToHide = 1;
      instance.toggleRef = { clientWidth: 100 };

      instance.handleGrow();

      expect(decreaseCountToHide).toHaveBeenCalledWith(instance.handleGrow);
    });
  });
});
