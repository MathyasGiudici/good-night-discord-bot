const playFromYoutube = require('../utils/yt-player');

module.exports = {
	name: 'music',
	description: 'Playing YouTube music in a Voice Channel',
	args: ['youtubelink'],
	guildOnly: true,
	async execute(message, args) {
		// Join the same voice channel of the author of the message
		if (!message.member.voice.channel) {
			return message.reply('I can\'t play that command! You must be in a Voice Channel');
		}

		const voiceChannel = await playFromYoutube(message, args[0]);

		try { voiceChannel.leave(); }
		catch (error) { return; }
	},
};
