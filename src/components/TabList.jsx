import React from 'react';
import cx from 'clsx';

const defaultProps = {
  className: 'react-tabs__tab-list',
};

/*
Left for TS migration
const propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};*/
const TabList = (props) => {
  const { children, className, ...attributes } = {
    ...defaultProps,
    ...props,
  };

  return (
    <ul {...attributes} className={cx(className)} role="tablist">
      {children}
    </ul>
  );
};

TabList.tabsRole = 'TabList';

export default TabList;
