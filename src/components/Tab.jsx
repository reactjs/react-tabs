import React, { useEffect, useRef } from 'react';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab';

/*
Left for TS migration
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  disabledClassName: PropTypes.string,
  focus: PropTypes.bool, // private
  id: PropTypes.string, // private
  selected: PropTypes.bool, // private
  selectedClassName: PropTypes.string,
  tabIndex: PropTypes.string,
  tabRef: PropTypes.func, // private
};*/

const Tab = ({
  children,
  className = DEFAULT_CLASS,
  disabled,
  disabledClassName = `${DEFAULT_CLASS}--disabled`,
  focus = false,
  id = null,
  selected = false,
  selectedClassName = `${DEFAULT_CLASS}--selected`,
  tabIndex,
  tabRef,
  ...attributes
}) => {
  let nodeRef = useRef();

  useEffect(() => {
    if (selected && focus) {
      nodeRef.current.focus();
    }
  }, [selected, focus]);

  return (
    <li
      {...attributes}
      className={cx(className, {
        [selectedClassName]: selected,
        [disabledClassName]: disabled,
      })}
      ref={(node) => {
        nodeRef.current = node;
        if (tabRef) tabRef(node);
      }}
      role="tab"
      id={`tab${id}`}
      aria-selected={selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-controls={`panel${id}`}
      tabIndex={tabIndex || (selected ? '0' : null)}
      data-rttab
    >
      {children}
    </li>
  );
};

Tab.tabsRole = 'Tab';

export default Tab;
