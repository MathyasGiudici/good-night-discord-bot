// Importing env
require('dotenv').config();

// Importing packages
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

// Importing config
const config = require('./files/config.json');

// Importing server to keep alive
const keepAlive = require('./server');

// Importing role helper
const roleHelper = require('./utils/role-helper');

// Client and command list creation
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});
client.commands = new Collection();

// Loading commands
const commandFiles = fs
	.readdirSync('./src/commands')
	.filter((file) => file.endsWith('.js'));

// Parsing commands
commandFiles.forEach((value) => {
	const command = require(`./commands/${value}`);
	client.commands.set(command.name, command);
});

// Logging ready of the bot
client.on('ready', () => {
	keepAlive(client);

	console.log('[Bot]: The bot is online!');
	// Client activity
	client.user.setActivity(`${config.prefix}night`, { type: 'LISTENING' });
});

// Checking messages
client.on('messageCreate', (message) => {
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

		const check = roleHelper(message);

		// Checking no direct messages and roles
		if (message.channel.type === 'DM') {
			if (cmd.guildOnly) {return message.reply('I can\'t execute that command inside DMs!');}
		}
		else if (!(message.member.permissions.has('ADMINISTRATOR')) && !check) {
			return message.reply(
				'You can\'t execute that command! Ask the administrator to enable your role.',
			);
		}

		// Checking obligatory args number
		if (!(args.length >= cmd.args.length)) {
			return message.reply(
				`I can't execute that command! I need all the mandatory arguments:\n ${
					config.prefix
				}${cmd.name} ${cmd.args.toString().replace(/,/g, ' ')}`,
			);
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
