import cx from 'clsx';
import type { FunctionComponent } from 'react';
import type { TabListProps } from '../types';

const defaultProps = {
  className: 'react-tabs__tab-list',
};

const TabList = (props: TabListProps) => {
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

export default TabList as FunctionComponent<TabListProps>;
