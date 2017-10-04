export function isTab({type = {}}) {
  return type.tabsRole === 'Tab';
}

export function isTabPanel({type = {}}) {
  return type.tabsRole === 'TabPanel';
}

export function isTabList({type = {}}) {
  return type.tabsRole === 'TabList';
}
