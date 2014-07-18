var id = 0;
function uuid() {
	return 'react-tabs-' + (id++);
}

module.exports = {
	uuid: uuid
};
