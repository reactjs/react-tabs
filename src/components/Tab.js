import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab';
const DEFAULT_PROPS = {
  className: DEFAULT_CLASS,
  disabledClassName: `${DEFAULT_CLASS}--disabled`,
  focus: false,
  id: null,
  panelId: null,
  selected: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

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
  panelId: PropTypes.string, // private
  selected: PropTypes.bool, // private
  selectedClassName: PropTypes.string,
  tabIndex: PropTypes.string,
  tabRef: PropTypes.func, // private
};

const Tab = (props) => {
  let nodeRef = useRef();
  const {
    children,
    className,
    disabled,
    disabledClassName,
    focus,
    id,
    panelId,
    selected,
    selectedClassName,
    tabIndex,
    tabRef,
    ...attributes
  } = props;

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
      id={id}
      aria-selected={selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-controls={panelId}
      tabIndex={tabIndex || (selected ? '0' : null)}
      data-rttab
    >
      {children}
    </li>
  );
};
Tab.propTypes = propTypes;

Tab.tabsRole = 'Tab';
Tab.defaultProps = DEFAULT_PROPS;
export default Tab;
