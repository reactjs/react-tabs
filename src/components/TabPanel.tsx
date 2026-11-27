import cx from 'clsx';
import type { FunctionComponent } from 'react';
import type { TabPanelProps } from '../types';

const DEFAULT_CLASS = 'react-tabs__tab-panel';
const defaultProps = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

export interface TabPanelInjectedProps extends Pick<
  TabPanelProps,
  'forceRender' | 'selectedClassName'
> {
  id: string;
  selected: boolean;
}

const TabPanel = (props: TabPanelProps & Partial<TabPanelInjectedProps>) => {
  const {
    children,
    className,
    forceRender,
    id,
    selected,
    selectedClassName,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };

  return (
    <div
      {...attributes}
      className={cx(className, {
        [selectedClassName]: selected,
      })}
      role="tabpanel"
      id={`panel${id}`}
      aria-labelledby={`tab${id}`}
    >
      {forceRender || selected ? children : null}
    </div>
  );
};

TabPanel.tabsRole = 'TabPanel';

export default TabPanel as FunctionComponent<TabPanelProps>;
