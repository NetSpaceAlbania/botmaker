// Require the necessary discord.js classes
const { Routes  } = require('discord.js');
const { REST } = require('@discordjs/rest');

const fs = require('node:fs');
require('dotenv').config();
const path = require('node:path');
const token = process.env.DISCORD_TOKEN;

module.exports = {
	name: 'ready',
	once: true,
	execute() {
		
        //Running this script will register all your commands to the guild of which the id was passed in above.
        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const CommandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        // Place your client and guild ids here
        const clientId = process.env.CLIENT_ID;
        const guildId = process.env.GUILD_ID;

        for (const file of CommandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '10' }).setToken(token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
	},
};