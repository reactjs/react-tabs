import { checkPropTypes } from 'prop-types';
import { useEffect, useState, type FunctionComponent } from 'react';
import type { TabsProps } from '../types';
import {
  childrenPropType,
  onSelectPropType,
  selectedIndexPropType,
} from '../helpers/propTypes';
import UncontrolledTabs, {
  type UncontrolledTabsProps,
} from './UncontrolledTabs';
import { getTabsCount } from '../helpers/count';

const propTypes = {
  children: childrenPropType,
  onSelect: onSelectPropType,
  selectedIndex: selectedIndexPropType,
};
const defaultProps = {
  defaultFocus: false,
  focusTabOnClick: true,
  forceRenderTabPanel: false,
  selectedIndex: null,
  defaultIndex: null,
  environment: null,
  disableUpDownKeys: false,
  disableLeftRightKeys: false,
};

const checkForIllegalModeChange = (
  selectedIndex: number | null | undefined,
  isControlled: boolean,
) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    isControlled !== (selectedIndex !== null)
  ) {
    throw new Error(
      `Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`Tabs\`.
For more information about controlled and uncontrolled mode of react-tabs see https://github.com/reactjs/react-tabs#controlled-vs-uncontrolled-mode.`,
    );
  }
};

const Tabs = (props: TabsProps) => {
  checkPropTypes(propTypes, props, 'prop', 'Tabs');
  const {
    children,
    defaultFocus,
    defaultIndex,
    focusTabOnClick,
    onSelect,
    selectedIndex: controlledIndex,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };

  const [focus, setFocus] = useState(false);
  const [isControlled] = useState(controlledIndex !== null);
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex || 0);
  // Keep the legacy controlled behavior when selectedIndex is explicitly undefined.
  const selectedIndex = isControlled
    ? (controlledIndex as number)
    : uncontrolledIndex;

  const tabsCount = isControlled ? 0 : getTabsCount(children);
  useEffect(() => {
    if (!isControlled) {
      // Removing tabs can move the current selection past the last tab.
      const maxTabIndex = Math.max(0, tabsCount - 1);
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setUncontrolledIndex((index) => Math.min(index, maxTabIndex));
    }
  }, [isControlled, tabsCount]);

  checkForIllegalModeChange(controlledIndex, isControlled);

  const handleSelected: UncontrolledTabsProps['onSelect'] = (
    index,
    last,
    event,
  ) => {
    // Call change event handler
    if (typeof onSelect === 'function') {
      // Check if the change event handler cancels the tab change
      if (onSelect(index, last, event) === false) return;
    }

    // Always set focus on tabs unless it is disabled
    if (focusTabOnClick) {
      setFocus(true);
    }

    if (!isControlled) {
      // Update selected index
      setUncontrolledIndex(index);
    }
  };

  return (
    <UncontrolledTabs
      {...attributes}
      defaultFocus={defaultFocus}
      focus={focus}
      onSelect={handleSelected}
      selectedIndex={selectedIndex}
    >
      {children}
    </UncontrolledTabs>
  );
};

Tabs.tabsRole = 'Tabs';

export default Tabs as FunctionComponent<TabsProps>;
