const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const ConfessSettingsMongooseDB = require('../models/ConfessSettingsMongooseDB')
const UserMongooseDB = require('../models/DiscordUser')
const data_channelConfessSetup = new SlashCommandBuilder()
.setName('confess')
.setDescription('Open up anonymously!')
.addStringOption(option =>{
    return option
        .setName('input')
        .setDescription('Dont be cringe!')
        .setRequired(true)
});


    
module.exports = {
    data: data_channelConfessSetup,
    async execute(interaction) {

        const server = await ConfessSettingsMongooseDB.findOne({id: interaction.guildId})
        const user = await UserMongooseDB.findOne({id: interaction.user.id})
        if(!server || server.status == 'off' || server.channel != interaction.channelId) return;


        if(!user){
            //create the schema of the server
            const schema = await UserMongooseDB.create({
                id: interaction.user.id,
                last_input_confess_date: 0

            });
            try{
                await schema.save();
            }catch(err){
                console.log(err)
            }
        }

        let lastDate = user.last_input_confess_date
        let timeout = server.timeout;


        

        const input = interaction.options.getString('input');      


        if (lastDate - (Date.now() - timeout*60*1000) <= 0){

            const SuccsessEmbed = new EmbedBuilder()
	            .setColor('Random')
                .setDescription(input)
                .setTimestamp()
                .setFooter({ text: 'Dërguar në mënyrë anonime!'})


            interaction.member.guild.channels.cache.get(interaction.channelId).send({ embeds: [SuccsessEmbed] })
            await interaction.reply({ content: 'Input sent to the confess channel. I hope so!.', ephemeral: true });
            
            try{
                await UserMongooseDB.updateOne({id: interaction.user.id},{
                    last_input_confess_date: Date.now()
                });
            }catch(err){
                console.log(err)
            }

        }else{
            const ErrorEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`You are still on time-out.\nYou can send one input each ${timeout} minute.\nHow much left? Idk lazzy to code it.`)
            .setTimestamp()
            .setFooter({ text: 'Vetëm ju mund ta shihni këtë mesazh!'})
            await interaction.reply({ embeds: [ErrorEmbed], ephemeral: true });
        }
        
    },
};
    