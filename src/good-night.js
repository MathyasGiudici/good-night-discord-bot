// Importing env
require('dotenv').config();

// Importing packages
const fs = require('fs');
const { Client, Collection } = require('discord.js');

// Importing config
const config = require('./files/config.json');

// Importing role helper
const roleHelper = require('./utils/role-helper');

// Client and command list creation
const client = new Client();
client.commands = new Collection();

// Loading commands
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));

// Parsing commands
commandFiles.forEach((value) => {
	const command = require(`./commands/${value}`);
	client.commands.set(command.name, command);
});

// Logging ready of the bot
client.on('ready', () => {
	console.log(`${client.user.username} has logged in`);
});

// Checking messages
client.on('message', async (message) => {
	// Checking the prefix
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	// Composing command and args
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	// Checking available command
	if (!client.commands.has(command)) return;

	// Trying to call the command
	try {
		// Getting the command
		const cmd = client.commands.get(command);

		const check = await roleHelper(message);

		// Checking no direct messages and roles
		if (message.channel.type === 'dm') {
			if (cmd.guildOnly) return message.reply('I can\'t execute that command inside DMs!');
		}
		else if (!message.member.hasPermission('ADMINISTRATOR') && !check) {
			return message.reply('You can\'t execute that command! Ask the administrator to enable your role.');
		}

		// Checking obligatory args number
		if(!(args.length >= cmd.args.length)) {
			return message.reply(`I can't execute that command! I need all the mandatory arguments:\n ${config.prefix}${cmd.name} ${cmd.args.toString().replace(/,/g, ' ')}`);
		}

		// Calling the
		cmd.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
