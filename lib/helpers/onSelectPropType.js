import React from 'react';

module.exports = function onSelectPropType(props) {
  // onSelect is optional
  if (!('onSelect' in props)) {
    return null;
  }

  // onSelect, if present, must be a function
  const error = React.PropTypes.func.apply(null, arguments);
  if (error) {
    return error;
  }

  if (typeof props.selectedIndex !== 'number') {
    return new Error('`onSelect` must be accompanied by a numeric `selectedIndex`');
  }

  return null;
};
