export const mergeConditions = (...funcs) => value => (
  funcs.reduce((acc, func) => acc && func(value), true)
);

export const wrapperHasNoProp = propName => wrapper => typeof wrapper.prop(propName) === 'undefined';

export const wrapperHasProp = propName => wrapper => typeof wrapper.prop(propName) !== 'undefined';

export const wrapperIsType = Component => wrapper => wrapper.type() === Component;
