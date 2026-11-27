import cx from 'clsx';
import { useContext, type FunctionComponent } from 'react';
import type { TabPanelProps } from '../types';
import { TabsItemContext } from './TabsItemContext';

const DEFAULT_CLASS = 'react-tabs__tab-panel';
const defaultProps = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

const TabPanel = (props: TabPanelProps) => {
  const item = useContext(TabsItemContext);
  const panel = item?.kind === 'panel' ? item : null;
  const {
    children,
    className,
    forceRender,
    id: ownId,
    selectedClassName,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };
  const id = panel ? panel.id : ownId;
  const selected = panel?.selected ?? false;

  return (
    <div
      {...attributes}
      className={cx(className, {
        [panel?.selectedClassName || selectedClassName]: selected,
      })}
      role="tabpanel"
      id={`panel${id}`}
      aria-labelledby={`tab${id}`}
    >
      <TabsItemContext.Provider value={null}>
        {panel?.forceRender || forceRender || selected ? children : null}
      </TabsItemContext.Provider>
    </div>
  );
};

TabPanel.tabsRole = 'TabPanel';

export default TabPanel as FunctionComponent<TabPanelProps>;
