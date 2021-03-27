module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: [],
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
