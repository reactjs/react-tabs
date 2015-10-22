import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { TabList } from '../../main';
import { equal } from 'assert';

/* eslint func-names:0 */
describe('Tab', function() {
  it('should have sane defaults', function() {
    const tabList = TestUtils.renderIntoDocument(<TabList/>);
    const node = findDOMNode(tabList);

    equal(node.className, 'ReactTabs__TabList');
    equal(node.getAttribute('role'), 'tablist');
  });

  it('should accept className', function() {
    const tabList = TestUtils.renderIntoDocument(<TabList className="foobar"/>);
    const node = findDOMNode(tabList);

    equal(node.className, 'ReactTabs__TabList foobar');
  });
});
