const fs = require('node:fs');
require('dotenv').config();
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, GatewayIntentBits ,Collection  } = require('discord.js');


//db
const db = require('./database/database');


const token = process.env.DISCORD_TOKEN;
// Create a new client instance { intents: [ }
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

//db Connect
db.then(() => console.log('Connected to MongoDB.')).catch(err => console.log(err));


//command handling
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

//event handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Login to Discord with your client's token
client.login(token);