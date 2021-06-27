const moment = require('moment-timezone');
const config = require('../../files/config.json');
const playFromYoutube = require('../../utils/yt-player');

const night = async function(message) {
	const voiceChannel = await playFromYoutube(message, config['night-song']);

	if(voiceChannel) {
		// Kicking people
		voiceChannel.members.each((member) => {
			try {
			// kick the member
				member.voice.setChannel(null);
			}
			catch (error) {
				console.log(error);
			}
		});
	}
};

module.exports = {
	name: 'night',
	description: 'Set the time when a Voice Channel should go to bed',
	args: ['hour', 'minutes', 'isTomorrow'],
	guildOnly: true,
	async execute(message, args) {
		// Checking that the user is in a Voice Channel
		if (!message.member.voice.channel) {
			return message.reply('I can\'t play that command! You must be in a Voice Channel.');
		}

		// Setting hour and minutes
		const hour = parseInt(args[0]);
		if (!(hour >= 0 && hour <= 23)) {
			message.channel.send('Insert a hour with a range from 0 to 23');
		}

		const min = parseInt(args[1]);
		if (!(min >= 0 && min <= 59)) {
			message.channel.send('Insert minutes with a range from 0 to 59');
		}

		// Checking the date to refer to
		const isTomorrow = args[2].toLowerCase() === 'yes' || args[2].toLowerCase() === 'y';

		// Creating timer
		const timer = moment().tz('Europe/Rome').hours(hour).minutes(min).seconds(0).milliseconds(0).add(isTomorrow ? 1 : 0, 'days');

		// Creating trigger
		const trigger = moment().tz('Europe/Rome').add(config['night-milliseconds'], 'milliseconds');

		// Checking the timer and trigger
		if(trigger <= timer) {
			// Setting the timer
			setTimeout(() => {
				// Function at the timer stop
				night(message);
			}, timer - trigger);

			message.channel.send('Good night saved!');
		}
		else {
			message.channel.send('Date must be in the future of at least 2 minutes!');
		}
	},
};
