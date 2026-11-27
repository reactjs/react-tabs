import { useEffect, useRef, type FunctionComponent } from 'react';
import type { TabProps } from '../types';
import cx from 'clsx';

const DEFAULT_CLASS = 'react-tabs__tab';
const defaultProps = {
  className: DEFAULT_CLASS,
  disabledClassName: `${DEFAULT_CLASS}--disabled`,
  focus: false,
  id: null,
  selected: false,
  selectedClassName: `${DEFAULT_CLASS}--selected`,
};

export interface TabInjectedProps extends Pick<
  TabProps,
  'disabledClassName' | 'selectedClassName'
> {
  id: string;
  focus: boolean;
  selected: boolean;
  tabRef: (node: HTMLLIElement | null) => void;
}

const Tab = (props: TabProps & Partial<TabInjectedProps>) => {
  const nodeRef = useRef<HTMLLIElement | null>(null);
  const {
    children,
    className,
    disabled,
    disabledClassName,
    focus,
    id,
    selected,
    selectedClassName,
    tabIndex,
    tabRef,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };

  useEffect(() => {
    if (selected && focus) {
      nodeRef.current?.focus();
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
      id={`tab${id}`}
      aria-selected={selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      aria-controls={`panel${id}`}
      // The public API accepts a string and React forwards it to the DOM.
      tabIndex={(tabIndex || (selected ? '0' : null)) as unknown as number}
      data-rttab
    >
      {children}
    </li>
  );
};

Tab.tabsRole = 'Tab';

export default Tab as FunctionComponent<TabProps>;
