# botmaker
This is the repository for the discord bots created by hsa community members.

- Project aim

- Project outline

- Skill level
Entry level project, contributions from intermediate and advanced members would be appreciated!


To be done:
    - Audio log
        Description: To show interaction create informantion and more.
    - Fix 'RefreshSlashCommands' event.
        Description: Support saving slash commands globally.
    - Confess feature
        Description: To upgrade it or remove it.
    - Slash commands:
        ~'server-info'
        ~'user-info'
        ~'avatar'
        ~Admin command helper.

Done: 
    - Database & models with mongoose.
    - Command handler.        
    - Event listen handler.
    - Event listener:
        'RefreshSlashCommands'
            Description: Refresh all slash commands (event listener 'ready').
        'interactionCreate'
            Description: Interaction create executer and other feature extensions (event listener 'interactionCreate').
        'deleteMessagesOnConfessChannel' 
            Description: Extension for the /confess feature. (event listener 'messageCreate').
    - Slash commands.
        '/setupconfesschannel':
            Description: Setup the channel for confessing. Admin usage only.
        '/confess':
            Description: Open up anonymously!.
        '/ping':
            Description: Replies with Pong!.

Setup the bot:
    .env file:
    
        ~ DISCORD_TOKEN=
            Description: Discord bot token.
            
    	~ CLIENT_ID=
            Description: Discord bot id.
            
        ~ GUILD_ID=
            Description: The guild id for slash command usage.
            
        ~ MONGOOSE_URI=
            Description: Mongoose uri.
            
    Dependencies
        "@discordjs/rest": "^1.0.1"
        "discord.js": "^14.2.0"
        "dotenv": "^16.0.1"
        "fs": "^0.0.1-security"
