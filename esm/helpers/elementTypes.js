function makeTypeChecker(tabsRole) {
  return function (element) {
    return !!element.type && element.type.tabsRole === tabsRole;
  };
}

export var isTab = makeTypeChecker('Tab');
export var isTabList = makeTypeChecker('TabList');
export var isTabPanel = makeTypeChecker('TabPanel');