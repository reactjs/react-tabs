import PropTypes from 'prop-types';
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
  direction: PropTypes.oneOf(['rtl', 'ltr']),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  defaultFocus: PropTypes.bool,
  defaultIndex: PropTypes.number,
  disabledTabClassName: PropTypes.string,
  disableUpDownKeys: PropTypes.bool,
  domRef: PropTypes.func,
  focusTabOnClick: PropTypes.bool,
  forceRenderTabPanel: PropTypes.bool,
  onSelect: onSelectPropType,
  selectedIndex: selectedIndexPropType,
  selectedTabClassName: PropTypes.string,
  selectedTabPanelClassName: PropTypes.string,
  environment: PropTypes.object,
};
const defaultProps = {
  defaultFocus: false,
  focusTabOnClick: true,
  forceRenderTabPanel: false,
  selectedIndex: null,
  defaultIndex: null,
  environment: null,
  disableUpDownKeys: false,
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
const Tabs = (props) => {
  const { children, defaultFocus, defaultIndex, focusTabOnClick, onSelect } =
    props;

  const [focus, setFocus] = useState(defaultFocus);
  const [mode] = useState(getModeFromProps(props));
  const [selectedIndex, setSelectedIndex] = useState(
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
      if (selectedIndex != null) {
        const maxTabIndex = Math.max(0, tabsCount - 1);
        setSelectedIndex(Math.min(selectedIndex, maxTabIndex));
      }
    }, [tabsCount]);
  }

  checkForIllegalModeChange(props, mode);

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
      setSelectedIndex(index);
    }
  };

  let subProps = { ...props };

  subProps.focus = focus;
  subProps.onSelect = handleSelected;

  if (selectedIndex != null) {
    subProps.selectedIndex = selectedIndex;
  }
  delete subProps.defaultFocus;
  delete subProps.defaultIndex;
  delete subProps.focusTabOnClick;
  return <UncontrolledTabs {...subProps}>{children}</UncontrolledTabs>;
};

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
Tabs.tabsRole = 'Tabs';

export default Tabs;
