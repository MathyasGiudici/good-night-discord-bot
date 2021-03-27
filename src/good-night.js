// Importing
require('dotenv').config();

const fs = require('fs');
const { Client, Collection } = require('discord.js');

const config = require('./utils/config.json');

// Client and command list creation
const client = new Client();
client.commands = new Collection();

// Loading commands
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((value) => {
	const command = require(`./commands/${value}`);
	client.commands.set(command.name, command);
});

client.on('ready', () => {
	console.log(`${client.user.username} has logged in`);
});

client.on('message', (message) => {
	// Checking the prefix
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	// Composing command and args
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	// Checking available command
	if (!client.commands.has(command)) return;

	// Trying to call the command
	try {
		const cmd = client.commands.get(command);
		if (cmd.guildOnly && message.channel.type === 'dm') {
			return message.reply(`${message.author}, I can't execute that command inside DMs!`);
		}
		if(cmd.args.length !== args.length) {
			return message.reply(`I can't execute that command! I need all the arguments ${cmd.args.toString()}`);
		}

		cmd.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
