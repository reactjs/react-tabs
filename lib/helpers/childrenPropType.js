var React = require('react');

module.exports = function (props, propName, componentName) {
  var error;
  var children = props[propName];
  var tabsCount = 0;
  var panelsCount = 0;

  React.Children.forEach(children, function (child) {
    if (child.type.displayName === 'TabList') {
      React.Children.forEach(child.props.children, function (c) {
        if (c.type.displayName === 'Tab') {
          tabsCount++;
        } else {
          error = new Error(
            'Expected `Tab` but found `' + (c.type.displayName || c.type) + '`'
          );
        }
      });
    } else if (child.type.displayName === 'TabPanel') {
      panelsCount++;
    } else {
      error = new Error(
        'Expected `TabList` or `TabPanel` but found `' + (child.type.displayName || child.type) + '`'
      );
    }
  });

  if (tabsCount !== panelsCount) {
    error = new Error(
      'There should be an equal number of `Tabs` and `TabPanels`. ' +
      'Received ' + tabsCount + ' `Tabs` and ' + panelsCount + ' `TabPanels`.'
    );
  }

  return error;
};
