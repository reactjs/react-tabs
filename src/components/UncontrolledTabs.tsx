import { checkPropTypes } from 'prop-types';
import {
  cloneElement,
  useEffect,
  useRef,
  useId,
  type KeyboardEvent,
} from 'react';
import type { TabEvent, TabsProps } from '../types';
import type { TabInjectedProps } from './Tab';
import type { TabPanelInjectedProps } from './TabPanel';
import cx from 'clsx';
import { childrenPropType } from '../helpers/propTypes';
import { getTabsCount as getTabsCountHelper } from '../helpers/count';
import { deepMap } from '../helpers/childrenDeepMap';
import { isTabList, isTabPanel } from '../helpers/elementTypes';

function isNode(node: Node | null | undefined): node is Element {
  return !!node && 'getAttribute' in node;
}

// Determine if a node from event.target is a Tab element
function isTabNode(node: Node | null): node is Element {
  return isNode(node) && !!node.getAttribute('data-rttab');
}

// Determine if a tab node is disabled
function isTabDisabled(node: Node | null | undefined) {
  return isNode(node) && node.getAttribute('aria-disabled') === 'true';
}

let canUseActiveElement: boolean | undefined;

function determineCanUseActiveElement(environment: Window | null | undefined) {
  const env =
    environment || (typeof window !== 'undefined' ? window : undefined);

  try {
    canUseActiveElement = !!(
      typeof env !== 'undefined' &&
      env.document &&
      env.document.activeElement
    );
  } catch {
    // Work around for IE bug when accessing document.activeElement in an iframe
    // Refer to the following resources:
    // http://stackoverflow.com/a/10982960/369687
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12733599
    // istanbul ignore next
    canUseActiveElement = false;
  }
}

const defaultProps = {
  className: 'react-tabs',
  focus: false,
};

const propTypes = {
  children: childrenPropType,
};

export interface UncontrolledTabsProps extends Omit<
  TabsProps,
  'environment' | 'onSelect'
> {
  environment?: Window | null;
  focus?: boolean;
  onSelect: (index: number, last: number, event: TabEvent) => void;
  selectedIndex: number;
}

const UncontrolledTabs = (props: UncontrolledTabsProps) => {
  checkPropTypes(propTypes, props, 'prop', 'UncontrolledTabs');
  const tabNodesRef = useRef<(HTMLLIElement | null)[]>([]);
  const tabIdsRef = useRef<string[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const id = useId();
  const initialFocusIndexRef = useRef(
    props.defaultFocus ? props.selectedIndex : null,
  );

  useEffect(() => {
    const index = initialFocusIndexRef.current;
    if (index !== null && Number.isInteger(index)) {
      tabNodesRef.current[index]?.focus();
    }
  }, []);

  function setSelected(index: number, event: TabEvent) {
    // Check index boundary
    if (index < 0 || index >= getTabsCount()) return;

    const { onSelect, selectedIndex } = props;

    // Call change event handler
    onSelect(index, selectedIndex, event);
  }

  function getNextTab(index: number) {
    const count = getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }

    // All tabs are disabled, return index
    /* istanbul ignore next */
    return index;
  }

  function getPrevTab(index: number) {
    let i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = getTabsCount();
    while (i-- > index) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }

    // All tabs are disabled, return index
    /* istanbul ignore next */
    return index;
  }

  function getFirstTab() {
    const count = getTabsCount();

    // Look for non disabled tab from the first tab
    for (let i = 0; i < count; i++) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }

    return null;
  }

  function getLastTab() {
    let i = getTabsCount();

    // Look for non disabled tab from the last tab
    while (i--) {
      if (!isTabDisabled(getTab(i))) {
        return i;
      }
    }

    return null;
  }

  function getTabsCount() {
    const { children } = props;
    return getTabsCountHelper(children);
  }

  function getTab(index: number) {
    return tabNodesRef.current[index];
  }

  function getChildren() {
    let index = 0;
    const {
      children,
      disabledTabClassName,
      focus,
      forceRenderTabPanel,
      selectedIndex,
      selectedTabClassName,
      selectedTabPanelClassName,
      environment,
    } = props;

    tabIdsRef.current = tabIdsRef.current || [];
    let diff = tabIdsRef.current.length - getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      tabIdsRef.current.push(`${id}${tabIdsRef.current.length}`);
    }

    // Map children to dynamically setup refs
    return deepMap(children, (child) => {
      let result = child;

      // Clone TabList and Tab components to have refs
      if (isTabList(child)) {
        let listIndex = 0;

        // Figure out if the current focus in the DOM is set on a Tab
        // If it is we should keep the focus on the next selected tab
        let wasTabFocused = false;

        if (canUseActiveElement == null) {
          determineCanUseActiveElement(environment);
        }

        const env =
          environment || (typeof window !== 'undefined' ? window : undefined);
        if (canUseActiveElement && env) {
          wasTabFocused = Object.keys(tabNodesRef.current).some(
            (key) =>
              env.document.activeElement === tabNodesRef.current[Number(key)],
          );
        }

        result = cloneElement(child, {
          children: deepMap(child.props.children, (tab) => {
            const index = listIndex++;
            const selected = selectedIndex === index;

            const props: TabInjectedProps = {
              tabRef: (node) => {
                tabNodesRef.current[index] = node;
              },
              id: tabIdsRef.current[index],
              selected,
              focus: selected && (focus || wasTabFocused),
            };

            if (selectedTabClassName)
              props.selectedClassName = selectedTabClassName;
            if (disabledTabClassName)
              props.disabledClassName = disabledTabClassName;

            return cloneElement<typeof tab.props & Partial<TabInjectedProps>>(
              tab,
              props,
            );
          }),
        });
      } else if (isTabPanel(child)) {
        const props: TabPanelInjectedProps = {
          id: tabIdsRef.current[index],
          selected: selectedIndex === index,
        };

        if (forceRenderTabPanel) props.forceRender = forceRenderTabPanel;
        if (selectedTabPanelClassName)
          props.selectedClassName = selectedTabPanelClassName;

        index++;

        result = cloneElement<
          typeof child.props & Partial<TabPanelInjectedProps>
        >(child, props);
      }

      return result;
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const { direction, disableUpDownKeys, disableLeftRightKeys } = props;
    if (isTabFromContainer(e.target as Node)) {
      let index: number | null = props.selectedIndex;
      let preventDefault = false;
      let useSelectedIndex = false;

      if (
        e.code === 'Space' ||
        e.keyCode === 32 /* space */ ||
        e.code === 'Enter' ||
        e.keyCode === 13 /* enter */
      ) {
        preventDefault = true;
        useSelectedIndex = false;
        handleClick(e);
      }

      // keyCode is deprecated and only used here for IE

      if (
        (!disableLeftRightKeys &&
          (e.keyCode === 37 || e.code === 'ArrowLeft')) /* arrow left */ ||
        (!disableUpDownKeys &&
          (e.keyCode === 38 || e.code === 'ArrowUp')) /* arrow up */
      ) {
        // Select next tab to the left, validate if up arrow is not disabled
        if (direction === 'rtl') {
          index = getNextTab(index);
        } else {
          index = getPrevTab(index);
        }
        preventDefault = true;
        useSelectedIndex = true;
      } else if (
        (!disableLeftRightKeys &&
          (e.keyCode === 39 || e.code === 'ArrowRight')) /* arrow right */ ||
        (!disableUpDownKeys &&
          (e.keyCode === 40 || e.code === 'ArrowDown')) /* arrow down */
      ) {
        // Select next tab to the right, validate if down arrow is not disabled
        if (direction === 'rtl') {
          index = getPrevTab(index);
        } else {
          index = getNextTab(index);
        }
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.keyCode === 35 || e.code === 'End') {
        // Select last tab (End key)
        index = getLastTab();
        preventDefault = true;
        useSelectedIndex = true;
      } else if (e.keyCode === 36 || e.code === 'Home') {
        // Select first tab (Home key)
        index = getFirstTab();
        preventDefault = true;
        useSelectedIndex = true;
      }

      // This prevents scrollbars from moving around
      if (preventDefault) {
        e.preventDefault();
      }

      // Only use the selected index in the state if we're not using the tabbed index
      if (useSelectedIndex && index !== null) {
        setSelected(index, e);
      }
    }
  }

  function handleClick(e: TabEvent) {
    let node: Node | null = e.target as Node;
    do {
      if (isTabFromContainer(node)) {
        if (isTabDisabled(node)) {
          return;
        }

        const index = Array.from(node.parentElement!.children)
          .filter(isTabNode)
          .indexOf(node);
        setSelected(index, e);
        return;
      }
    } while ((node = node.parentNode) != null);
  }

  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */
  function isTabFromContainer(node: Node): node is Element {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    }

    // Check if the first occurrence of a Tabs container is `this` one.
    let nodeAncestor = node.parentElement;
    do {
      if (nodeAncestor === ref.current) return true;
      if (nodeAncestor?.getAttribute('data-rttabs')) break;

      nodeAncestor = nodeAncestor?.parentElement ?? null;
    } while (nodeAncestor);

    return false;
  }
  const {
    children, // unused
    className,
    defaultFocus, // unused
    disabledTabClassName, // unused
    domRef,
    focus, // unused
    forceRenderTabPanel, // unused
    onSelect, // unused
    selectedIndex, // unused
    selectedTabClassName, // unused
    selectedTabPanelClassName, // unused
    environment, // unused
    disableUpDownKeys, // unused
    disableLeftRightKeys, // unused
    ...attributes
  } = {
    ...defaultProps,
    ...props,
  };
  return (
    <div
      {...attributes}
      className={cx(className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={(node) => {
        ref.current = node;
        if (domRef) domRef(node);
      }}
      data-rttabs
    >
      {getChildren()}
    </div>
  );
};

export default UncontrolledTabs;
