import React from 'react';
import cx from 'clsx';

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

const TabList = ({
  children,
  className = 'react-tabs__tab-list',
  ...attributes
}) => {
  return (
    <ul {...attributes} className={cx(className)} role="tablist">
      {children}
    </ul>
  );
};

TabList.tabsRole = 'TabList';

export default TabList;
