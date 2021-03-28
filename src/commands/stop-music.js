module.exports = {
	name: 'stopmusic',
	description: 'Stopping music in the Voice Channel',
	args: [],
	guildOnly: true,
	async execute(message, args) {
		// Get the client's voiceConnection
		const clientVoiceConnection = message.guild.voice;

		// Checking if the client is in a voice channel
		if (!clientVoiceConnection) return message.reply('I\'m not in any Voice Channel');

		// Get the user's voiceChannel
		const userVoiceChannel = message.member.voice;

		// Return from the code if the user isn't in a voiceChannel
		if (!userVoiceChannel) return message.reply('You must be in the Voice Channel to stop music');

		// Compare the voiceChannels
		if (userVoiceChannel.channel === clientVoiceConnection.channel) {
			// The client and user are in the same voiceChannel, the client can disconnect
			clientVoiceConnection.connection.disconnect();
		}
		else {
			// The client and user are NOT in the same voiceChannel
			return message.reply('You must be in the same Voice Channel of the bot to stop music');
		}
	},
};
