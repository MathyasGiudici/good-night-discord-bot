module.exports = {
	name: 'stopmusic',
	description: 'Stopping music in the Voice Channel',
	args: [],
	guildOnly: true,
	async execute(message, args) {
		// Checking if the client is in a voice channel
		if (message.guild.voiceStates.cache.size === 0) return message.reply('I\'m not in any Voice Channel');

		// Return from the code if the user isn't in a voiceChannel
		if (!message.member.voice.channel) return message.reply('You must be in the Voice Channel to stop music');

		// Looping a collection
		for (const [key, value] of message.guild.voiceStates.cache) {
			if (value.channelId === message.member.voice.channelId) {
				value.disconnect();
				return;
			}
		}

		message.reply('You must be in the same Voice Channel of the bot to stop music');
		return;
	},
};
