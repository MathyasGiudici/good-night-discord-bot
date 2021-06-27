module.exports = {
	name: 'version',
	description: 'Return the running version of the bot',
	args: [],
	guildOnly: true,
	execute(message, args) {
		if (message.client) message.channel.send(`Version ${process.env.npm_package_version}`);
	},
};
