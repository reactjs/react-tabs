import { useContext } from 'react';
import type { TabProps } from '../types';
import { getItemIdentity, TabsContext } from './TabsContext';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab';
const defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: `${DEFAULT_CLASS}--disabled`,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

const Tab = (props: TabProps) => {
  const group = useContext(TabsContext);
  const {
    children,
    className,
    disabled,
    disabledClassName,
    id: ownId,
    itemKey,
    selectedClassName,
    tabIndex,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };
  const { id, token } = getItemIdentity(group?.id, itemKey);
  const selected = group?.selectedKey === itemKey;
  const tabbable = selected || group?.fallbackKey === itemKey;

  return (
    <li
      {...attributes}
      className={cx(className, {
        [group?.selectedTabClassName || selectedClassName]: selected,
        [group?.disabledTabClassName || disabledClassName]: disabled,
      })}
      role="tab"
      id={id === undefined ? ownId : `tab${id}`}
      aria-selected={selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-controls={id === undefined ? undefined : `panel${id}`}
      tabIndex={tabIndex ?? (tabbable ? 0 : undefined)}
      data-rttab={token}
    >
      {children}
    </li>
  );
};

export default Tab;
