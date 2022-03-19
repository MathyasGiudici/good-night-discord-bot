const express = require('express');
const server = express();

const serverPort = process.env.PORT || 8080;

function keepAlive(client) {
	// looking to the servers
	const nServers = client.guilds.cache.size;
	const serversArray = [];

	for(const guild of client.guilds.cache.values()) {
		serversArray.push(guild.name);
	}

	// Home response
	server.get('/', (req, res)=>{
		res.write('<h1>Goodnight Bot Backend is up!</h1>');
		res.end();
	});

	server.get('/servers', (req, res)=>{
		res.write(`<h1>Connected servers ${nServers}</h1><p>${JSON.stringify(serversArray)}</p>`);
		res.end();
	});

	server.listen(serverPort, () => {
		console.log('[Server]: The server is online!');
	});
}

module.exports = keepAlive;