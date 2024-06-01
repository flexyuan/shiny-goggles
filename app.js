import {Client, GatewayIntentBits} from 'discord.js';
import {TOKEN} from './config.js';
import {handleStartegyMessage, handleBillMessage} from './src/handler.js';
import http from 'http';

const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('OK');
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



const client = new Client({intents: [GatewayIntentBits.Guilds]});

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