// Get a universally unique identifier
module.exports = (function () {
  var count = 0;
  return function () {
    return 'react-tabs-' + count++;
  }
})();
