import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { TabPanel } from '../../main';
import { equal } from 'assert';

/* eslint func-names:0 */
describe('Tab', function() {
  it('should have sane defaults', function() {
    const tabPanel = TestUtils.renderIntoDocument(<TabPanel>Hola</TabPanel>);
    const node = findDOMNode(tabPanel);

    equal(node.className, 'ReactTabs__TabPanel');
    equal(node.getAttribute('role'), 'tabpanel');
    equal(node.getAttribute('aria-labelledby'), null);
    equal(node.getAttribute('id'), null);
    equal(node.innerHTML, '');
    equal(node.style.display, 'none');
  });

  it('should accept className', function() {
    const tabPanel = TestUtils.renderIntoDocument(<TabPanel className="foobar"/>);
    const node = findDOMNode(tabPanel);

    equal(node.className, 'ReactTabs__TabPanel foobar');
  });

  it('should support being selected', function() {
    const tabPanel = TestUtils.renderIntoDocument(<TabPanel selected id="abcd" tabId="1234">Hola</TabPanel>);
    const node = findDOMNode(tabPanel);

    equal(node.className, 'ReactTabs__TabPanel ReactTabs__TabPanel--selected');
    equal(node.getAttribute('aria-labelledby'), '1234');
    equal(node.getAttribute('id'), 'abcd');
    equal(node.innerHTML, 'Hola');
    equal(node.style.display, '');
  });
});

