const config = require('../files/config');
const keyv = require('../utils/data');

module.exports = {
	name: 'enable',
	description: 'Adding command execution powers to a role',
	guildOnly: true,
	args: ['role'],
	async execute(message, args) {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.reply('Sorry, only the admin can execute this command');
		}

		const key = config['prefix-roles-db'].concat(args[0]);
		await keyv.set(key, true);

		return message.reply(`${args[0]} role granted.`);
	},
};
