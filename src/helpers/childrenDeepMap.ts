import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { isTabPanel, isTab, isTabList } from './elementTypes';

type ChildProps = { children?: ReactNode };
export type ChildElement = ReactElement<ChildProps>;

function isTabChild(child: ChildElement) {
  return isTab(child) || isTabList(child) || isTabPanel(child);
}

export function deepMap(
  children: ReactNode,
  callback: (child: ChildElement) => ReactNode,
): ReactNode {
  return Children.map(children, (child) => {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (!isValidElement<ChildProps>(child)) return child;

    if (isTabChild(child)) {
      return callback(child);
    }

    if (
      child.props &&
      child.props.children &&
      typeof child.props.children === 'object'
    ) {
      // Clone the child that has children and map them too
      return cloneElement(child, {
        ...child.props,
        children: deepMap(child.props.children, callback),
      });
    }

    return child;
  });
}

export function deepForEach(
  children: ReactNode,
  callback: (child: ChildElement) => void,
) {
  return Children.forEach(children, (child) => {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/reactjs/react-tabs/issues/37
    if (!isValidElement<ChildProps>(child)) return;

    if (isTab(child) || isTabPanel(child)) {
      callback(child);
    } else if (
      child.props &&
      child.props.children &&
      typeof child.props.children === 'object'
    ) {
      if (isTabList(child)) callback(child);
      deepForEach(child.props.children, callback);
    }
  });
}
