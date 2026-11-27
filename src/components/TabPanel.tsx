import cx from 'clsx';
import { useContext } from 'react';
import type { TabPanelProps } from '../types.js';
import { getItemIdentity, TabsContext } from './TabsContext.js';

const DEFAULT_CLASS = 'react-tabs__tab-panel';
const defaultProps = {
  className: DEFAULT_CLASS,
  forceRender: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

const TabPanel = (props: TabPanelProps) => {
  const group = useContext(TabsContext);
  const {
    children,
    className,
    forceRender,
    id: ownId,
    itemKey,
    selectedClassName,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };
  const { id, token } = getItemIdentity(group?.id, itemKey);
  const selected = group?.selectedKey === itemKey;

  return (
    <div
      {...attributes}
      className={cx(className, {
        [group?.selectedTabPanelClassName || selectedClassName]: selected,
      })}
      role="tabpanel"
      id={id === undefined ? ownId : `panel${id}`}
      aria-labelledby={id === undefined ? undefined : `tab${id}`}
      data-rttabpanel={token}
    >
      {group?.forceRenderTabPanel || forceRender || selected ? children : null}
    </div>
  );
};

export default TabPanel;
