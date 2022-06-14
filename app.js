import {} from 'dotenv/config'

import { Client, Intents } from 'discord.js';
import { processMessage } from './src/messageHandler.js';

const client = new Client(
  { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }
);

// Notify progress
client.on('ready', function (e) {
  console.log(`Successfully connected as ${client.user.tag}!`)
})

// Authenticate
client.login(process.env.DISCORD_TOKEN)

// Handle Messages
client.on('messageCreate', async function(msg) { await processMessage(msg) })