import cx from 'clsx';
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
    <ul {...attributes} className={cx(className)} role="tablist" data-rttablist>
      {children}
    </ul>
  );
};

export default TabList;
