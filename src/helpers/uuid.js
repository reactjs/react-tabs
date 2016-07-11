// Get a universally unique identifier
let count = 0;
module.exports = function uuid(component) {
  const instance = component._reactInternalInstance || component;
  const uniqueId = instance && (instance._rootNodeId || instance._mountOrder) || count++;

  return 'react-tabs-' + uniqueId;
};
