const ConfessSettingsMongooseDB = require('../models/ConfessSettingsMongooseDB')



async function deleteInteractionsOnConfessChannel(interaction){
	try{     
		const server = await ConfessSettingsMongooseDB.findOne({id: interaction.guildId})      
  
		if(server.status == 'on' && server.channel == interaction.channelId){
			//delete the interactions unless its not from command confess or its ephemeral=true
			if(interaction.commandName != 'confess' && interaction.ephemeral == false) interaction.deleteReply();
		}
	}catch(err){
		console.log(err)
	}
}
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {		

		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
	
		if (!command) return;
	
		try {
			await command.execute(interaction);
			await deleteInteractionsOnConfessChannel(interaction)
		} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	    }
	},
};
