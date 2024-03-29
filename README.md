# good-night-discord-bot

<div style="display: flex; align-items: center; justify-content: center;">
	<img src="./assets/icon.png" width="25%"/>
</div>

**Good Night**, the discord bot for saying good night to your friends in voice chat.
Just set the time and minutes, the bot will enter the call, say good night and disconnect everyone.

## Invite Link
To add the bot in your server use the [invite link](https://bit.ly/39xq4xd)

## Commands
Once the bot is imported, it will only respond to commands invoked by the server admin.
To get other users to interact, assign the bot the role of the group you want it to interact with.

### Command !night
Set the time when a Voice Channel should go to bed:
> !night hour minutes isTomorrow

### !ping
Test command to see if the server is on. Returns the ping:
> !ping

### Command !help
List all of my commands:
> !help

Info about a specific command:
> !help [command]

### Command !music
Playing YouTube music in a Voice Channel:
> !music youtubelink

### Command !stopmusic
Stopping music in the Voice Channel:
> !stopmusic

## Community | TODOs
- [ ] Problem with the usage of [node-ytdl-core](https://github.com/fent/node-ytdl-core/issues/635)
- [ ] When using youtube, if the $music command is launched during the $night execution, it skips

## Changelog
- 1.1.0: Partial resolution (static song loading) of $night and its override
- 1.1.1: $version command

## Coding

### Installation
The package manager is _npm_.
To install the dependencies, run:
```
npm install
```

**Important:** setup the environment variables in the _.env_ file.
```
DISCORD_BOT_TOKEN=<token generate with discord development portal>
```

### Usage
To run the bot, launch the command:
```
npm start
```

