import {
  extendProps,
  getItemsData,
  getItemsIdsByGrades,
  hasIndex,
} from './utils';

describe('extendProps', () => {
  it('merges props objects', () => {
    const firstProps = { test: 'item' };
    const secondProps = { another: 'value' };
    const expected = { another: 'value', test: 'item' };

    const result = extendProps(firstProps)(secondProps);

    expect(result).toEqual(expected);
  });

  it('treats first argument as prioritised', () => {
    const firstProps = { test: 'item' };
    const secondProps = { test: 'value' };
    const expected = { test: 'item' };

    const result = extendProps(firstProps)(secondProps);

    expect(result).toEqual(expected);
  });
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

describe('getItemsData', () => {
  it('returns hidden count', () => {
    const countToHide = 2;
    const items = [
      { grade: 2 },
      { grade: 5 },
      { grade: 1 },
      { grade: 7 },
      { grade: 3 },
    ];
    const expected = expect.objectContaining({ countToHide });

    const result = getItemsData(items, countToHide);

    expect(result).toEqual(expected);
  });

  it('returns items that are in visible range', () => {
    const countToHide = 2;
    const items = [
      { grade: 2 },
      { grade: 5 },
      { grade: 1 },
      { grade: 7 },
      { grade: 3 },
    ];
    const expected = expect.objectContaining({
      items: [{ grade: 2 }, { grade: 1 }, { grade: 3 }],
    });

    const result = getItemsData(items, countToHide);

    expect(result).toEqual(expected);
  });

  it('returns items that are out of visible range', () => {
    const countToHide = 2;
    const items = [
      { grade: 2 },
      { grade: 5 },
      { grade: 1 },
      { grade: 7 },
      { grade: 3 },
    ];
    const expected = expect.objectContaining({
      exceedingItems: [{ grade: 5 }, { grade: 7 }],
    });

    const result = getItemsData(items, countToHide);

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
