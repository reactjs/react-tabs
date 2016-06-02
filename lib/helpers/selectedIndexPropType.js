import React from 'react';

module.exports = function selectedIndexPropType(props) {
  // selectedIndex is optional
  if (!('selectedIndex' in props)) {
    return null;
  }

  // selectedIndex, if present, must be a number
  const error = React.PropTypes.number.apply(null, arguments);
  if (error) {
    return error;
  }

  if (typeof props.onSelect !== 'function') {
    return new Error('`selectedIndex` must be accompanied by a function `onSelect`');
  }
};
