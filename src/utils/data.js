const Keyv = require('keyv');
const { KeyvFile } = require('keyv-file');

// More options with default value:
const customKeyv = new Keyv({
	store: new KeyvFile({
		filename: './src/files/db.json',
		writeDelay: 100,
		encode: JSON.stringify,
		decode: JSON.parse,
	}),
});

customKeyv.on('error', err => console.log('Connection Error', err));

module.exports = customKeyv;