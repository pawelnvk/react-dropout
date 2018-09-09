import { func, node } from 'prop-types';
import React from 'react';

const Referred = ({ attach, children, ...restProps }) => {
  const child = React.Children.only(children);
  const childWithReference = React.cloneElement(child, { ...restProps, ref: attach });

  return childWithReference;
};

Referred.propTypes = {
  attach: func.isRequired,
  children: node.isRequired,
};

export { Referred };
