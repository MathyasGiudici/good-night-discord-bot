/* eslint-disable no-unreachable */
const config = require('../files/config.json');
const playFromYoutube = require('../utils/yt-player');

const night = async function(message) {
	const voiceChannel = await playFromYoutube(message, config['night-song']);

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
};

module.exports = {
	name: 'night',
	description: 'Set the time when a Voice Channel should go to bed',
	args: ['Hour', 'Time', 'isTomorrow?'],
	guildOnly: true,
	async execute(message, args) {
		const timer = new Date();

		if(args[2].toLowerCase() === 'yes' || args[2].toLowerCase() === 'y') {
			timer.setDate(timer.getDate() + 1);
		}

		// Setting hour and minutes
		const hour = parseInt(args[0]);
		if (hour >= 0 && hour <= 23) {
			timer.setHours(hour);
		}
		else {
			message.channel.send('Insert a hour with a range from 0 to 23');
		}
		const min = parseInt(args[1]);
		if (min >= 0 && min <= 59) {
			timer.setMinutes(min);
		}
		else {
			message.channel.send('Insert minutes with a range from 0 to 59');
		}
		timer.setSeconds(0);
		timer.setMilliseconds(0);

		let trigger = new Date();
		trigger = new Date(trigger.getTime() + config['night-milliseconds']);
		if(trigger < timer) {
			// Setting the timer
			setTimeout(() => {
				// Function at the timer stop
				night(message);
			}, timer - Date.now() - config['night-milliseconds']);

			message.channel.send('Good night saved!');
		}
		else {
			message.channel.send('Date must be in the future of at least 2 minutes!');
		}
	},
};
