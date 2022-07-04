# bot.py
import os

import discord
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client()

@client.event
async def on_ready():
    print(f'{client.user.name} has connected to Discord!')

@client.event
async def on_member_join(member):
    await member.create_dm()
    await member.dm_channel.send(
 f'Welcome {client},\n #roles \n ```per te marre role``` \n #hackerspace-albania \n ```per te pare kush jemi dhe cfare bejme``` \n #pershkrimi-i-vetes \n ```nese ke deshire``` /n ')

client.run(TOKEN)
