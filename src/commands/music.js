const playFromYoutube = require('../utils/yt-player');

module.exports = {
	name: 'music',
	description: 'Play music from youtube',
	args: ['youtubelink>'],
	guildOnly: true,
	async execute(message, args) {
		const voiceChannel = await playFromYoutube(message, args[0]);
		voiceChannel.leave();
	},
};
