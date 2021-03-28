module.exports = {
	name: 'ping',
	description: 'Test command: Ping!',
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
