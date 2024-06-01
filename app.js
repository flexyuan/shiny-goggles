import {Client, GatewayIntentBits} from 'discord.js';
import {TOKEN} from './config.js';
const client = new Client({intents: [GatewayIntentBits.Guilds]});
import {handleStartegyMessage, handleBillMessage} from './src/handler.js';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    } if (interaction.commandName === "strategy") {
        return handleStartegyMessage(interaction);
    } else if (interaction.commandName === "bill_spots") {
        return handleBillMessage(interaction);
    }
});

client.login(TOKEN);