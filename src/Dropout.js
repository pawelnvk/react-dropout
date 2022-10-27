import { arrayOf, func, number, shape } from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { extendProps, getItemsData } from './utils';

const INITIAL_COUNT_TO_HIDE = 0;

const Dropout = ({ children, items }) => {
  const [countToHide, setCountToHide] = useState(INITIAL_COUNT_TO_HIDE);
  const contentRef = useRef(null);
  const rootRef = useRef(null);
  const shadowContentRef = useRef(null);
  const modifyCountToHide = useCallback(() => {
    const hasFreeSpace =
      shadowContentRef.current.clientWidth !== contentRef.current.clientWidth &&
      rootRef.current.clientWidth > shadowContentRef.current.clientWidth;
    const hasExceedingContent =
      rootRef.current.clientWidth <= contentRef.current.clientWidth;

    if (hasFreeSpace) {
      setCountToHide((prevCountToHide) => prevCountToHide - 1);
    } else if (hasExceedingContent) {
      setCountToHide((prevCountToHide) => prevCountToHide + 1);
    }
  }, []);
  const propsGetter = useMemo(
    () => ({
      content: extendProps({ ref: contentRef }),
      root: extendProps({ ref: rootRef }),
      shadowContent: extendProps({ ref: shadowContentRef }),
      shadowRoot: extendProps({
        style: {
          left: '-100%',
          position: 'fixed',
          top: '0px',
          visibility: 'hidden',
          width: '100%',
        },
      }),
    }),
    [],
  );

  useEffect(() => {
    modifyCountToHide();
  }, [countToHide, items, modifyCountToHide]);

  useEffect(() => {
    window.addEventListener('resize', modifyCountToHide);

    return () => {
      window.removeEventListener('resize', modifyCountToHide);
    };
  }, [modifyCountToHide]);

  return (
    <>
      {children({
        ...getItemsData(items, countToHide),
        getContentProps: propsGetter.content,
        getRootProps: propsGetter.root,
      })}

      {children({
        ...getItemsData(items, countToHide - 1),
        getContentProps: propsGetter.shadowContent,
        getRootProps: propsGetter.shadowRoot,
      })}
    </>
  );
};

Dropout.propTypes = {
  children: func.isRequired,
  items: arrayOf(
    shape({
      grade: number,
    }),
  ),
};

Dropout.defaultProps = {
  items: [],
};

export { Dropout };
