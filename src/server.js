const loadMD = '<script src="https://rawcdn.githack.com/oscarmorrison/md-page/master/md-page.js"></script><noscript>';
const fs = require('fs');
const express = require('express');
const server = express();

server.all('/', (req, res)=>{
	const readme = fs.readFileSync('./README.md');
	res.setHeader('Content-Type', 'text/html');
	res.write(loadMD.concat(readme));
	res.end();
});

function keepAlive() {
	server.listen(3000, () =>{ console.log('Server is online!');});
}

module.exports = keepAlive;