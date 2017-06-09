import React from 'react';
import Children from 'react-children-utilities';
import Tab from '../components/Tab';
import TabList from '../components/TabList';
import TabPanel from '../components/TabPanel';

export function childrenPropType(props, propName, componentName) {
  let error;
  let tabsCount = 0;
  let panelsCount = 0;
  const children = props[propName];

  Children.deepForEach(children, child => {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (child === null) {
      return;
    }

    if (child.type === TabList) {
      React.Children.forEach(child.props.children, c => {
        // null happens when conditionally rendering TabPanel/Tab
        // see https://github.com/reactjs/react-tabs/issues/37
        if (c === null) {
          return;
        }

        if (c.type === Tab) {
          tabsCount++;
        }
      });
    } else if (child.type === TabPanel) {
      panelsCount++;
      /*
    } else {
    error = new Error(
      `Expected 'TabList' or 'TabPanel' but found '${child.type.displayName || child.type}' in \`${componentName}\``,
    );
    */
    }
  });

  if (tabsCount !== panelsCount) {
    error = new Error(
      `There should be an equal number of 'Tab' and 'TabPanel' in \`${componentName}\`.` +
        `Received ${tabsCount} 'Tab' and ${panelsCount} 'TabPanel'.`,
    );
  }

  return error;
}

export function onSelectPropType(props, propName, componentName, location, propFullName) {
  const prop = props[propName];
  const name = propFullName || propName;
  let error = null;

  if (prop && typeof prop !== 'function') {
    error = new Error(
      `Invalid ${location} \`${name}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected \`function\`.`,
    );
  } else if (props.selectedIndex != null && prop == null) {
    error = new Error(
      `The ${location} \`${name}\` is marked as required in \`${componentName}\`, but its value is \`undefined\` or \`null\`.
\`onSelect\` is required when \`selectedIndex\` is also set. Not doing so will make the tabs not do anything, as \`selectedIndex\` indicates that you want to handle the selected tab yourself.
If you only want to set the inital tab replace \`selectedIndex\` with \`defaultIndex\`.`,
    );
  }

  return error;
}

export function selectedIndexPropType(props, propName, componentName, location, propFullName) {
  const prop = props[propName];
  const name = propFullName || propName;
  let error = null;

  if (prop != null && typeof prop !== 'number') {
    error = new Error(
      `Invalid ${location} \`${name}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected \`number\`.`,
    );
  } else if (props.defaultIndex != null && prop != null) {
    return new Error(
      `The ${location} \`${name}\` cannot be used together with \`defaultIndex\` in \`${componentName}\`.
Either remove \`${name}\` to let \`${componentName}\` handle the selected tab internally or remove \`defaultIndex\` to handle it yourself.`,
    );
  }

  return error;
}
