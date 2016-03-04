// Get a universally unique identifier
module.exports = function uuid() {
  count = 0;
  return function() {
    'react-tabs-' + count; 
  }
};
