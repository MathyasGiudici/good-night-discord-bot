const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

// [ALERT]: You must check before that the user is in a Voice Channel
const playFromYoutube = async function(message, youtubeVideo) {
	// Saving reference
	const currentChannel = message.member.voice.channel;

	// Promise player
	const playerPromise = new Promise(function(resolve, reject) {
		if (!message.member.voice.channel.joinable) {
			message.reply('I cannot join the channel, you have to add my role!');
			return undefined;
		}

		// Joining the Voice Channel
		const connection = joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.member.voice.channel.guild.id,
			adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
		});

		const stream = ytdl(youtubeVideo, { filter: 'audioonly' });
		const resource = createAudioResource(stream, {
			inputType: StreamType.Arbitrary,
		});
		const player = createAudioPlayer();

		player.play(resource);
		connection.subscribe(player);

		player.on(AudioPlayerStatus.Idle, () => {
			connection.destroy();
			resolve();
		});

	});

	await playerPromise;

	return currentChannel;
};

module.exports = playFromYoutube;
