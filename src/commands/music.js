const playFromYoutube = require('../utils/yt-player');

module.exports = {
	name: 'music',
	description: 'Playing YouTube music in a Voice Channel',
	args: ['youtubelink'],
	guildOnly: true,
	async execute(message, args) {
		const voiceChannel = await playFromYoutube(message, args[0]);
		voiceChannel.leave();
	},
};
