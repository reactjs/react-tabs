import { useContext, useEffect, useRef, type FunctionComponent } from 'react';
import type { TabProps } from '../types';
import { TabsItemContext } from './TabsItemContext';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab';
const defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: `${DEFAULT_CLASS}--disabled`,
  id: null,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

const Tab = (props: TabProps) => {
  const item = useContext(TabsItemContext);
  const tab = item?.kind === 'tab' ? item : null;
  const nodeRef = useRef<HTMLLIElement | null>(null);
  const {
    children,
    className,
    disabled,
    disabledClassName,
    id: ownId,
    selectedClassName,
    tabIndex,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };
  const id = tab ? tab.id : ownId;
  const selected = tab?.selected ?? false;
  const focus = tab?.focus ?? false;

  useEffect(() => {
    if (selected && focus) {
      nodeRef.current?.focus();
    }
  }, [selected, focus]);

  return (
    <li
      {...attributes}
      className={cx(className, {
        [tab?.selectedClassName || selectedClassName]: selected,
        [tab?.disabledClassName || disabledClassName]: disabled,
      })}
      ref={(node) => {
        nodeRef.current = node;
        tab?.registerNode(node);
      }}
      role="tab"
      id={`tab${id}`}
      aria-selected={selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-controls={`panel${id}`}
      tabIndex={tabIndex ?? (selected ? 0 : undefined)}
      data-rttab
    >
      <TabsItemContext.Provider value={null}>
        {children}
      </TabsItemContext.Provider>
    </li>
  );
};

Tab.tabsRole = 'Tab';

export default Tab as FunctionComponent<TabProps>;
