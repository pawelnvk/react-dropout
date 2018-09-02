import React from 'react';

const Referred = ({ attach, children, ...restProps }) => {
  const child = React.Children.only(children);
  const childWithReference = React.cloneElement(child, { ...restProps, ref: attach });

  return childWithReference;
};

export { Referred };
