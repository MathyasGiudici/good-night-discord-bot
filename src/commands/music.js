module.exports = {
	name: 'music',
	description: 'Play music from youtube',
	args: ['youtubelink>'],
	guildOnly: true,
	async execute(message, args) {
		// Join the same voice channel of the author of the message
		if (!message.member.voice.channel) {
			return message.reply('I can\'t play that command! You must be in a voice channel');
		}

		const ytdl = require('ytdl-core');

		const currentChannel = message.member.voice.channel;
		await message.member.voice.channel.join().then(async (connection) => {
			const stream = ytdl(args[0], { filter: 'audioonly' })
				.on('error', e => {
					console.error(e);
					message.channel.send('Error Occurred during playback. Try again later.');
				});

			const dispatcher = await connection.play(stream);

			message.channel.send(`Now Playing in #${currentChannel.name}`);
			dispatcher.on('end', e => {
				message.channel.send(`Finished Playing in #${currentChannel.name}`);
			});
		});
	},
};
