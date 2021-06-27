const path = require('path');

// [ALERT]: You must check before that the user is in a Voice Channel
const playFromFile = async function(message, file) {
	// Saving reference
	const currentChannel = message.member.voice.channel;

	// Promise player
	const playerPromise = new Promise(function(resolve, reject) {
		if (!message.member.voice.channel.joinable) {
			message.reply('I cannot join the channel, you have to add my role!');
			return undefined;
		}

		message.member.voice.channel.join().then(async (connection) => {
			const filePath = path.normalize(path.join(__dirname, `../files/${file}`));
			const dispatcher = await connection.play(filePath);

			return await dispatcher.on('finish', e => { resolve(); });
		});
	});

	await playerPromise;

	return currentChannel;
};

module.exports = playFromFile;