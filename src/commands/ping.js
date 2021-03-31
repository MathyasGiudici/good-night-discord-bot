module.exports = {
	name: 'ping',
	description: 'Test command: Ping!',
	args: [],
	guildOnly: true,
	execute(message, args) {
		if (message.client) message.channel.send(`Pong (${message.client.ws.ping}ms).`);
	},
};
