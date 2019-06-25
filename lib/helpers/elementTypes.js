"use strict";

exports.__esModule = true;
exports.isTabPanel = exports.isTabList = exports.isTab = void 0;

function makeTypeChecker(tabsRole) {
  return function (element) {
    return !!element.type && element.type.tabsRole === tabsRole;
  };
}

var isTab = makeTypeChecker('Tab');
exports.isTab = isTab;
var isTabList = makeTypeChecker('TabList');
exports.isTabList = isTabList;
var isTabPanel = makeTypeChecker('TabPanel');
exports.isTabPanel = isTabPanel;