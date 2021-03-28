const roleChecker = require('../utils/role-checker');

module.exports = {
	name: 'role',
	description: 'Checking if a role has the power to execute commands',
	guildOnly: true,
	args: ['role'],
	async execute(message, args) {
		const result = await roleChecker(args[0]);
		if(result) {
			return message.reply(`${args[0]} has the power to execute commands`);
		}
		else {
			return message.reply(`${args[0]} has NOT the power to execute commands`);
		}
	},
};
