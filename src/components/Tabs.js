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
  forceRenderTabPanel: PropTypes.bool,
  onSelect: onSelectPropType,
  selectedIndex: selectedIndexPropType,
  selectedTabClassName: PropTypes.string,
  selectedTabPanelClassName: PropTypes.string,
  environment: PropTypes.object,
};
const defaultProps = {
  defaultFocus: false,
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
  const [focus, setFocus] = useState(props.defaultFocus);
  const [mode] = useState(getModeFromProps(props));
  const [selectedIndex, setSelectedIndex] = useState(
    mode === MODE_UNCONTROLLED ? props.defaultIndex || 0 : null,
  );

  // Reset focus after initial render, see comment above
  useEffect(() => {
    setFocus(false);
  }, []);

  if (mode === MODE_UNCONTROLLED) {
    // Ensure that we handle removed tabs and don't let selectedIndex get out of bounds
    useEffect(() => {
      if (selectedIndex != null) {
        const maxTabIndex = Math.max(0, getTabsCount(props.children) - 1);
        setSelectedIndex(Math.min(selectedIndex, maxTabIndex));
      }
    }, [getTabsCount(props.children)]);
  }

  checkForIllegalModeChange(props, mode);

  const handleSelected = (index, last, event) => {
    const { onSelect } = props;

    // Call change event handler
    if (typeof onSelect === 'function') {
      // Check if the change event handler cancels the tab change
      if (onSelect(index, last, event) === false) return;
    }

    if (event.type === 'keydown') {
      // Set focus if the change was triggered from the keyboard
      setFocus(true);
    }

    if (mode === MODE_UNCONTROLLED) {
      // Update selected index
      setSelectedIndex(index);
    }
  };

  let newProps = { ...props };
  const { children } = props;

  newProps.focus = focus;
  newProps.onSelect = handleSelected;

  if (selectedIndex != null) {
    newProps.selectedIndex = selectedIndex;
  }
  delete newProps.defaultFocus;
  delete newProps.defaultIndex;
  return <UncontrolledTabs {...newProps}>{children}</UncontrolledTabs>;
};
Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
Tabs.tabsRole = 'Tabs';

export default Tabs;
