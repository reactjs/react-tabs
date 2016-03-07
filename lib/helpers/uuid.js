
// Get a universally unique identifier
let count = 0;
module.exports =  function generateUUID(id) {
  count++;
  return (id) 
    ? 'react-tabs-' + count + '-' + id
    : 'react-tabs-' + count;
};
