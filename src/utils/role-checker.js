const config = require('../files/config');
const keyv = require('./data');

// Returns true if the role has the grant to execute commands
const roleChecker = async function(role) {
	const key = config['prefix-roles-db'].concat(role);
	const result = await keyv.get(key);
	if(result)	return true;
	else return false;
};

module.exports = roleChecker;