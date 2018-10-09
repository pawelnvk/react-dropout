export const getItemsIdsByGrades = (items = []) => Object.entries(items)
  .sort(([, { grade: gradeA }], [, { grade: gradeB }]) => gradeA - gradeB)
  .map(([id]) => Number(id));

export const hasIndex = ids => (value, index) => ids.indexOf(index) !== -1;

export const mergeConditions = (...funcs) => value => (
  funcs.reduce((acc, func) => acc && func(value), true)
);

export const wrapperHasNoProp = propName => wrapper => typeof wrapper.prop(propName) === 'undefined';

export const wrapperHasProp = propName => wrapper => typeof wrapper.prop(propName) !== 'undefined';

export const wrapperIsType = Component => wrapper => wrapper.type() === Component;
