const { prefix } = require('../files/config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	args: [],
	optionalArgs: ['command'],
	guildOnly: false,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if(args.length === 0) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}
		else {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('That\'s not a valid command!');
			}

			data.push(`**Name:** ${command.name}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.args) data.push(`**Mandatory Parameters:** ${prefix}${command.name} ${command.args.toString().replace(/,/g, ' ')}`);
			if (command.optionalArgs) data.push(`**Optional Parameters:** ${prefix}${command.name} ${command.args.toString().replace(/,/g, ' ')} ${command.optionalArgs.toString().replace(/,/g, ' ')}`);

			message.channel.send(data, { split: true });
		}
	},
};