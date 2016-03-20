'use strict';

// Get a universally unique identifier
var count = 0;
module.exports = function uuid(id) {
  return id ? 'react-tabs-' + count++ + '-' + id : 'react-tabs-' + count++;
};