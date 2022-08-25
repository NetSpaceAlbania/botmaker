const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const ConfessSettingsMongooseDB = require('../models/ConfessSettingsMongooseDB')

const data_channelConfessSetup = new SlashCommandBuilder()
	.setName("setupconfesschannel")
	.setDescription('Setup the channel for confessing')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addIntegerOption(option => {
        return option
        .setName("status")
        .setDescription('Close or open this event.')
        .setRequired(true)
        .addChoices(
            { name: 'On', value: 1 },
            { name: 'Off', value: 0 }
        )
    })
    .addChannelOption(option => {
        return option
        .setName('channel')
        .setDescription('Select an input & output channel.')
    })
    .addIntegerOption(option => {
        return option
        .setName("timeout")
        .setDescription('Defoult:off. Timeout of each input that a user can send in minutes.')
        
    });
module.exports = {
    data: data_channelConfessSetup,
    async execute(interaction) {
        let channel = interaction.options.getChannel('channel');
        let timeout = interaction.options.getInteger('timeout');
        let status = interaction.options.getInteger('status');

        if(status == 1) status = 'on';
        if(status == 0) status = 'off';
        
        const server = await ConfessSettingsMongooseDB.findOne({id: interaction.guildId})
        
        if(!server){
            //create the schema of the server
            let channelId;
            if(channel) channelId = channel.id;
            if(!channel) channelId = interaction.channelId;
            const schema = await ConfessSettingsMongooseDB.create({
                id: interaction.guildId,
                channel: channelId,
                timeout: timeout,
                status: status,
            });
            try{
                schema.save();
            }catch(err){
                console.log(err)
            }

        } else {
            //uptade the schema of the server
            try{
                let channelId;
                if(channel) channelId = channel.id;
                //nese esht null, marim ate qe ndodhet
                if(!channel) channelId = server.channel;
                if(!timeout) timeout = server.timeout;

                await ConfessSettingsMongooseDB.updateOne({id: interaction.guildId},{
                    channel: channelId,
                    timeout: timeout,
                    status: status,
                });
            }catch(err){
                console.log(err)
            }

        }

        if(!timeout) timeout = 0; 

        if(!channel && !server.channel) channel = 'none';

        if(server.channel) channel = `<#${server.channel}>`;
         
        await interaction.reply({ content: `**Status:** ${status}.\n**Channel:** ${channel}.\n**Timeout:** ${timeout} minutes.`, ephemeral: true });
        
    },
};
    