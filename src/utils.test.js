import {
  mergeConditions,
  wrapperHasNoProp,
  wrapperHasProp,
  wrapperIsType,
} from './utils';

const Component = () => null;

const getWrapper = () => ({
  prop: jest.fn(),
  type: jest.fn(),
});

describe('mergeConditions', () => {
  const falsyFunc = jest.fn().mockImplementation(() => false);
  const truthyFunc = jest.fn().mockImplementation(() => true);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('succedes if each of passed functions is truthy', () => {
    const funcs = [truthyFunc, truthyFunc];

    const result = mergeConditions(...funcs)();

    expect(result).toBeTruthy();
  });

  it('fails if any of passed functions is falsy', () => {
    const funcs = [truthyFunc, falsyFunc];

    const result = mergeConditions(...funcs)();

    expect(result).toBeFalsy();
  });

  it('calls each passed function with passed value', () => {
    const value = 'value';
    const funcs = [truthyFunc, falsyFunc];

    mergeConditions(...funcs)(value);

    expect(truthyFunc).toHaveBeenCalledWith(value);
    expect(falsyFunc).toHaveBeenCalledWith(value);
  });
});

describe('wrapperHasNoProp', () => {
  it('checks wrapper has no matching prop', () => {
    const wrapper = getWrapper();
    wrapper.prop.mockReturnValue(undefined);

    const result = wrapperHasNoProp('prop')(wrapper);

    expect(result).toBeTruthy();
  });
});

describe('wrapperHasProp', () => {
  it('checks wrapper has matching prop', () => {
    const wrapper = getWrapper();
    wrapper.prop.mockReturnValue(false);

    const result = wrapperHasProp('prop')(wrapper);

    expect(result).toBeTruthy();
  });
});

describe('wrapperIsType', () => {
  it('returns true if wrapper has matching type', () => {
    const wrapper = getWrapper();
    wrapper.type.mockReturnValue(Component);

    const result = wrapperIsType(Component)(wrapper);

    expect(result).toBeTruthy();
  });

  it('returns false if wrapper has not matching type', () => {
    const OtherComponent = () => null;
    const wrapper = getWrapper();
    wrapper.type.mockReturnValue(OtherComponent);

    const result = wrapperIsType(Component)(wrapper);

    expect(result).toBeFalsy();
  });
});
