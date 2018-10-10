import {
  getItemsIdsByGrades,
  hasIndex,
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

describe('getItemsIdsByGrades', () => {
  it('returns items ids by grade value', () => {
    const items = [
      { grade: 2 },
      { grade: 5 },
      { grade: 1 },
      { grade: 7 },
      { grade: 3 },
    ];
    const expected = [2, 0, 4, 1, 3];

    const result = getItemsIdsByGrades(items);

    expect(result).toEqual(expected);
  });

  it('does not move items if no grades provided', () => {
    const items = [
      { exact: true, page: 'Home', path: '/' },
      { page: 'About', path: '/about' },
      { page: 'History', path: '/history' },
      { page: 'Career', path: '/career' },
      { page: 'Blog', path: '/blog' },
      { page: 'Help', path: '/help' },
      { page: 'FAQ', path: '/faq' },
      { page: 'Products', path: '/products' },
      { page: 'Service', path: '/service' },
      { page: 'Articles', path: '/articles' },
      { page: 'Contact', path: '/contact' },
    ];
    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = getItemsIdsByGrades(items);

    expect(result).toEqual(expected);
  });
});

describe('hasIndex', () => {
  it('returns true if index of item is included in provided list', () => {
    const ids = [2];
    const item = [{}, 2];

    const result = hasIndex(ids)(...item);

    expect(result).toBeTruthy();
  });

  it('returns false if index of item is not included in provided list', () => {
    const ids = [1];
    const item = [{}, 2];

    const result = hasIndex(ids)(...item);

    expect(result).toBeFalsy();
  });
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
