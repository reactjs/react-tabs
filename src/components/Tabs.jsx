import { checkPropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
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
  /*
Left for TS migration
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  defaultFocus: PropTypes.bool,
  defaultIndex: PropTypes.number,
  direction: PropTypes.oneOf(['rtl', 'ltr']),
  disabledTabClassName: PropTypes.string,
  disableUpDownKeys: PropTypes.bool,
  disableLeftRightKeys: PropTypes.bool,
  domRef: PropTypes.func,
  environment: PropTypes.object,
  focusTabOnClick: PropTypes.bool,
  forceRenderTabPanel: PropTypes.bool,
  selectedTabClassName: PropTypes.string,
  selectedTabPanelClassName: PropTypes.string,*/
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
 *   focus: Whether a tab interaction has requested focus on the selected tab.
 */
const Tabs = (props) => {
  checkPropTypes(propTypes, props, 'prop', 'Tabs');
  const {
    children,
    defaultFocus,
    defaultIndex,
    focusTabOnClick,
    onSelect,
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };

  const [focus, setFocus] = useState(false);
  const [mode] = useState(() => getModeFromProps(attributes));
  const [selectedIndex, setSelectedIndex] = useState(
    mode === MODE_UNCONTROLLED ? defaultIndex || 0 : null,
  );

  const tabsCount = mode === MODE_UNCONTROLLED ? getTabsCount(children) : 0;
  useEffect(() => {
    if (mode === MODE_UNCONTROLLED) {
      // Removing tabs can move the current selection past the last tab.
      const maxTabIndex = Math.max(0, tabsCount - 1);
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setSelectedIndex((index) => Math.min(index, maxTabIndex));
    }
  }, [mode, tabsCount]);

  checkForIllegalModeChange(attributes, mode);

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

  let subProps = { ...props, ...attributes };

  subProps.defaultFocus = defaultFocus;
  subProps.focus = focus;
  subProps.onSelect = handleSelected;

  if (selectedIndex != null) {
    subProps.selectedIndex = selectedIndex;
  }
  delete subProps.defaultIndex;
  delete subProps.focusTabOnClick;
  return <UncontrolledTabs {...subProps}>{children}</UncontrolledTabs>;
};

Tabs.tabsRole = 'Tabs';

export default Tabs;
