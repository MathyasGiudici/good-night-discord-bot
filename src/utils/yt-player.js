const ytdl = require('ytdl-core');

const playFromYoutube = async function(message, youtubeVideo) {
	// Join the same voice channel of the author of the message
	if (!message.member.voice.channel) {
		return message.reply('I can\'t play that command! You must be in a voice channel');
	}

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

			message.channel.send(`Now Playing in #${currentChannel.name}`);
			return await dispatcher.on('finish', e => {
				message.channel.send(`Finished Playing in ${currentChannel.name}`);
				resolve();
			});
		});
	});

	await playerPromise;

	return currentChannel;
};

module.exports = playFromYoutube;