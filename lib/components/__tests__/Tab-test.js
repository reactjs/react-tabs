import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Tab } from '../../main';
import { equal, notEqual } from 'assert';

/* eslint func-names:0 */
describe('Tab', function() {
  it('should have sane defaults', function() {
    const tab = TestUtils.renderIntoDocument(<Tab/>);
    const node = findDOMNode(tab);

    equal(node.className, 'ReactTabs__Tab');
    equal(node.getAttribute('role'), 'tab');
    equal(node.getAttribute('aria-selected'), 'false');
    equal(node.getAttribute('aria-expanded'), 'false');
    equal(node.getAttribute('aria-disabled'), 'false');
    equal(node.getAttribute('aria-controls'), null);
    equal(node.getAttribute('id'), null);
    equal(node.innerHTML, '');
  });

  it('should accept className', function() {
    const tab = TestUtils.renderIntoDocument(<Tab className="foobar"/>);
    const node = findDOMNode(tab);

    notEqual(node.className.indexOf('foobar'), -1);
  });

  it('should support being selected', function() {
    const tab = TestUtils.renderIntoDocument(<Tab selected id="abcd" panelId="1234">Hello</Tab>);
    const node = findDOMNode(tab);

    equal(node.className, 'ReactTabs__Tab ReactTabs__Tab--selected');
    equal(node.getAttribute('aria-selected'), 'true');
    equal(node.getAttribute('aria-expanded'), 'true');
    equal(node.getAttribute('aria-controls'), '1234');
    equal(node.getAttribute('id'), 'abcd');
    equal(node.innerHTML, 'Hello');
  });

  it('should support being disabled', function() {
    const tab = TestUtils.renderIntoDocument(<Tab disabled/>);
    const node = findDOMNode(tab);

    equal(node.className, 'ReactTabs__Tab ReactTabs__Tab--disabled');
  });

  it('should pass through custom properties', function() {
    const tab = TestUtils.renderIntoDocument(<Tab data-tooltip="Tooltip contents"/>);
    const node = findDOMNode(tab);

    equal(node.getAttribute('data-tooltip'), 'Tooltip contents');
  });
  it('should allow overriding all default properties', function() {
    const tab = TestUtils.renderIntoDocument(<Tab role="micro-tab"/>);
    const node = findDOMNode(tab);

    equal(node.getAttribute('role'), 'micro-tab');
  });
  it('should merge className instead of overriding', function() {
    const tab = TestUtils.renderIntoDocument(<Tab className="foobar"/>);
    const node = findDOMNode(tab);

    notEqual(node.className.indexOf('ReactTabs__Tab'), -1);
    notEqual(node.className.indexOf('foobar'), -1);
  });
});
