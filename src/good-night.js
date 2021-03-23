// Loading env variables
require('dotenv').config();

// Abstracting console
const Console = console;

// Importing discord.js classes
const { Client } = require('discord.js');

// CLient creation
const client = new Client();

client.on('ready', () => {
  Console.log(`${client.user.username} has logged in`);
});

client.login(process.env.DISCORD_BOT_TOKEN);
