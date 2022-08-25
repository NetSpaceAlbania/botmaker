const ConfessSettingsMongooseDB = require('../models/ConfessSettingsMongooseDB')
require('dotenv').config();
const ClientId = process.env.CLIENT_ID

module.exports = {
     name: 'messageCreate',
     async execute(message) {
      if(message.author.bot) return;
      try{
         if(message && message.author.id != ClientId ){         
            const server = await ConfessSettingsMongooseDB.findOne({id: message.guildId})      
   
            if(server.status == 'on' && server.channel == message.channelId){
               message.delete()
            }
         }
      }catch(err){
         console.log(err)
      }


     },
}