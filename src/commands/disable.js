const config = require('../files/config');
const keyv = require('../utils/data');

module.exports = {
	name: 'disable',
	description: 'Removing command execution powers to a role',
	guildOnly: true,
	args: ['role'],
	async execute(message, args) {
		console.log('here');
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.reply('Sorry, only the admin can execute this command');
		}

		const key = config['prefix-roles-db'].concat(args[0]);
		await keyv.delete(key);

		return message.reply(`${args[0]} role removed.`);
	},
};
