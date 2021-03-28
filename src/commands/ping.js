module.exports = {
	name: 'ping',
	description: 'Test command: Ping!',
  args: [],
	guildOnly: true,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
