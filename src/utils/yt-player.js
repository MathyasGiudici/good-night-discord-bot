const ytdl = require('ytdl-core');

// [ALERT]: You must check before that the user is in a Voice Channel
const playFromYoutube = async function(message, youtubeVideo) {
	// Saving reference
	const currentChannel = message.member.voice.channel;

	// Promise player
	const playerPromise = new Promise(function(resolve, reject) {
		message.member.voice.channel.join().then(async (connection) => {
			const stream = ytdl(youtubeVideo, { filter: 'audioonly' })
				.on('error', e => {
					console.error(e);
					currentChannel.leave();
					reject();
				});
			const dispatcher = await connection.play(stream);

			return await dispatcher.on('finish', e => { resolve(); });
		});
	});

	await playerPromise;

	return currentChannel;
};

module.exports = playFromYoutube;