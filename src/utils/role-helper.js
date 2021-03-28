const roleChecker = require('./role-checker');

const roleHelper = async function(message) {

	let target = 0;

	// Checking the role
	const promise = new Promise ((res, rej) =>{
		// Check if the array is empty
		if(message.member.roles.cache.array().lenght == 0) {res();}

		// Looking at roles
		message.member.roles.cache.each(async (element) => {
			const result = await roleChecker(element.name);
			if(result) {
				target++;
				res();
			}
			else if(message.member.roles.cache.last() == element) {res();}
		});
	});

	await promise;

	if(target === 0) return false;
	else return true;
};

module.exports = roleHelper;