import PropTypes from 'prop-types';
import React, { cloneElement, Component } from 'react';
import cx from 'classnames';
import uuid from '../helpers/uuid';
import { childrenPropType } from '../helpers/propTypes';
import Tab from './Tab';
import TabList from './TabList';
import TabPanel from './TabPanel';
import { getPanelsCount, getTabsCount } from '../helpers/count';
import { deepMap } from '../helpers/childrenDeepMap';

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return node.nodeName === 'LI' && node.getAttribute('role') === 'tab';
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

const canUseActiveElement = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.activeElement
);

export default class UncontrolledTabs extends Component {
  static defaultProps = {
    className: 'react-tabs',
    focus: false,
  };

  static propTypes = {
    children: childrenPropType,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    disabledTabClassName: PropTypes.string,
    focus: PropTypes.bool,
    forceRenderTabPanel: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    selectedTabClassName: PropTypes.string,
    selectedTabPanelClassName: PropTypes.string,
  };

  tabNodes = [];

  setSelected(index, event) {
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;

    // Call change event handler
    this.props.onSelect(index, this.props.selectedIndex, event);
  }

  getNextTab(index) {
    const count = this.getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  }

  getPrevTab(index) {
    let i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount();
    while (i-- > index) {
      if (!isTabDisabled(this.getTab(i))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  }

  getTabsCount() {
    return getTabsCount(this.props.children);
  }

  getPanelsCount() {
    return getPanelsCount(this.props.children);
  }

  getTab(index) {
    return this.tabNodes[`tabs-${index}`];
  }

  getChildren() {
    let index = 0;
    const {
      children,
      disabledTabClassName,
      focus,
      forceRenderTabPanel,
      selectedIndex,
      selectedTabClassName,
      selectedTabPanelClassName,
    } = this.props;

    this.tabIds = this.tabIds || [];
    this.panelIds = this.panelIds || [];
    let diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      this.tabIds.push(uuid());
      this.panelIds.push(uuid());
    }

    // Map children to dynamically setup refs
    return deepMap(children, child => {
      let result = child;

      // Clone TabList and Tab components to have refs
      if (child.type === TabList) {
        let listIndex = 0;

        // Figure out if the current focus in the DOM is set on a Tab
        // If it is we should keep the focus on the next selected tab
        let wasTabFocused = false;

        if (canUseActiveElement) {
          wasTabFocused = React.Children
            .toArray(child.props.children)
            .filter(tab => tab.type === Tab)
            .some((tab, i) => document.activeElement === this.getTab(i));
        }

        result = cloneElement(child, {
          children: deepMap(child.props.children, tab => {
            const key = `tabs-${listIndex}`;
            const selected = selectedIndex === listIndex;

            const props = {
              tabRef: node => {
                this.tabNodes[key] = node;
              },
              id: this.tabIds[listIndex],
              panelId: this.panelIds[listIndex],
              selected,
              focus: selected && (focus || wasTabFocused),
            };

            if (selectedTabClassName) props.selectedClassName = selectedTabClassName;
            if (disabledTabClassName) props.disabledClassName = disabledTabClassName;

            listIndex++;

            return cloneElement(tab, props);
          }),
        });
      } else if (child.type === TabPanel) {
        const props = {
          id: this.panelIds[index],
          tabId: this.tabIds[index],
          selected: selectedIndex === index,
        };

        if (forceRenderTabPanel) props.forceRender = forceRenderTabPanel;
        if (selectedTabPanelClassName) props.selectedClassName = selectedTabPanelClassName;

        index++;

        result = cloneElement(child, props);
      }

      return result;
    });
  }

  handleKeyDown = e => {
    if (this.isTabFromContainer(e.target)) {
      let index = this.props.selectedIndex;
      let preventDefault = false;

      if (e.keyCode === 37 || e.keyCode === 38) {
        // Select next tab to the left
        index = this.getPrevTab(index);
        preventDefault = true;
      } else if (e.keyCode === 39 || e.keyCode === 40) {
        // Select next tab to the right
        index = this.getNextTab(index);
        preventDefault = true;
      }

      // This prevents scrollbars from moving around
      if (preventDefault) {
        e.preventDefault();
      }

      this.setSelected(index, e);
    }
  };

  handleClick = e => {
    let node = e.target;
    // eslint-disable-next-line no-cond-assign
    do {
      if (this.isTabFromContainer(node)) {
        if (isTabDisabled(node)) {
          return;
        }

        const index = [].slice.call(node.parentNode.children).filter(isTabNode).indexOf(node);
        this.setSelected(index, e);
        return;
      }
    } while ((node = node.parentNode) !== null);
  };

  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */
  isTabFromContainer(node) {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    }

    // Check if the first occurrence of a Tabs container is `this` one.
    let nodeAncestor = node.parentElement;
    do {
      if (nodeAncestor === this.node) return true;
      else if (nodeAncestor.getAttribute('data-tabs')) break;

      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);

    return false;
  }

  render() {
    // Delete all known props, so they don't get added to DOM
    const {
      children, // unused
      className,
      disabledTabClassName, // unused
      focus, // unused
      forceRenderTabPanel, // unused
      onSelect, // unused
      selectedIndex, // unused
      selectedTabClassName, // unused
      selectedTabPanelClassName, // unused
      ...attributes
    } = this.props;

    return (
      <div
        {...attributes}
        className={cx(className)}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        ref={node => {
          this.node = node;
        }}
        data-tabs
      >
        {this.getChildren()}
      </div>
    );
  }
}
