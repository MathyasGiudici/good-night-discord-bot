const roleHelper = function(message) {

	let hasPermission = false;
	// Checking bot roles availabilty
	if(message.guild.available) {
		// Mapping bot's roles name
		const botRoles = message.guild.me.roles.cache.map(role => role.name);
		// Removing the everyone
		if(botRoles.indexOf('@everyone')) botRoles.splice(botRoles.indexOf('@everyone'), 1);

		if(message.member.roles.cache.array().lenght !== 0) {
			// Mapping user's roles name
			const userRoles = message.member.roles.cache.map(role => role.name);
			// Removing the everyone
			if(userRoles.indexOf('@everyone')) userRoles.splice(botRoles.indexOf('@everyone'), 1);

			userRoles.forEach(element => {
				if(botRoles.includes(element)) hasPermission = true;
			});
		}
	}

	return hasPermission;
};

module.exports = roleHelper;