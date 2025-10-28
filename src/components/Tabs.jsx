import { checkPropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  childrenPropType,
  onSelectPropType,
  selectedIndexPropType,
} from '../helpers/propTypes';
import UncontrolledTabs from './UncontrolledTabs';
import { getTabsCount } from '../helpers/count';

const MODE_CONTROLLED = 0;
const MODE_UNCONTROLLED = 1;

const propTypes = {
  children: childrenPropType,
  onSelect: onSelectPropType,
  selectedIndex: selectedIndexPropType,
};

const getModeFromProps = (props) => {
  return props.selectedIndex === null ? MODE_UNCONTROLLED : MODE_CONTROLLED;
};

const checkForIllegalModeChange = (props, mode) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    mode != undefined &&
    mode !== getModeFromProps(props)
  ) {
    throw new Error(
      `Switching between controlled mode (by using \`selectedIndex\`) and uncontrolled mode is not supported in \`Tabs\`.
For more information about controlled and uncontrolled mode of react-tabs see https://github.com/reactjs/react-tabs#controlled-vs-uncontrolled-mode.`,
    );
  }
};

/**
 * State:
 *   mode: Initialized only once from props and never changes
 *   selectedIndex: null if controlled mode, otherwise initialized with prop defaultIndex, changed on selection of tabs, has effect to ensure it never gets out of bound
 *   focus: Because we never remove focus from the Tabs this state is only used to indicate that we should focus the current tab.
 *          It is initialized from the prop defaultFocus, and after the first render it is reset back to false. Later it can become true again when using keys to navigate the tabs.
 */
const Tabs = ({
  children,
  defaultFocus = false,
  defaultIndex = null,
  focusTabOnClick = true,
  forceRenderTabPanel = false,
  selectedIndex = null,
  environment = null,
  disableUpDownKeys = false,
  disableLeftRightKeys = false,
  onSelect,
  ...attributes
}) => {
  checkPropTypes(propTypes, { children, onSelect, selectedIndex }, 'prop', 'Tabs');

  // Check for conflicting props
  if (process.env.NODE_ENV !== 'production' && selectedIndex !== null && defaultIndex !== null) {
    console.error(
      'The prop `selectedIndex` cannot be used together with `defaultIndex` in `Tabs`.\n' +
      'Either remove `selectedIndex` to let `Tabs` handle the selected tab internally or remove `defaultIndex` to handle it yourself.'
    );
  }

  const [focus, setFocus] = useState(defaultFocus);
  const [mode] = useState(getModeFromProps({ selectedIndex }));
  const [selectedIndexState, setSelectedIndexState] = useState(
    mode === MODE_UNCONTROLLED ? defaultIndex || 0 : null,
  );

  useEffect(() => {
    // Reset focus after initial render, see comment above
    setFocus(false);
  }, []);

  if (mode === MODE_UNCONTROLLED) {
    // Ensure that we handle removed tabs and don't let selectedIndex get out of bounds
    const tabsCount = getTabsCount(children);
    useEffect(() => {
      if (selectedIndexState != null) {
        const maxTabIndex = Math.max(0, tabsCount - 1);
        setSelectedIndexState(Math.min(selectedIndexState, maxTabIndex));
      }
    }, [tabsCount]);
  }

  checkForIllegalModeChange({ selectedIndex }, mode);

  const handleSelected = (index, last, event) => {
    // Call change event handler
    if (typeof onSelect === 'function') {
      // Check if the change event handler cancels the tab change
      if (onSelect(index, last, event) === false) return;
    }

    // Always set focus on tabs unless it is disabled
    if (focusTabOnClick) {
      setFocus(true);
    }

    if (mode === MODE_UNCONTROLLED) {
      // Update selected index
      setSelectedIndexState(index);
    }
  };

  let subProps = {
    children,
    defaultFocus,
    defaultIndex,
    focusTabOnClick,
    forceRenderTabPanel,
    selectedIndex,
    environment,
    disableUpDownKeys,
    disableLeftRightKeys,
    onSelect,
    ...attributes
  };

  subProps.focus = focus;
  subProps.onSelect = handleSelected;

  if (selectedIndexState != null) {
    subProps.selectedIndex = selectedIndexState;
  }
  
  delete subProps.defaultFocus;
  delete subProps.defaultIndex;
  delete subProps.focusTabOnClick;
  
  return <UncontrolledTabs {...subProps}>{children}</UncontrolledTabs>;
};

Tabs.tabsRole = 'Tabs';

export default Tabs;
