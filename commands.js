import 'dotenv/config.js';
import { REST, Routes } from 'discord.js';
import {CLIENT_ID, TOKEN} from './config.js';

const STRATEGY_COMMAND = {
  name: 'strategy',
  description: 'Get the strategy for a track',
  options: [
    {
      type: 3,
      name: 'track',
      description: 'Pick your track',
      required: true,
    },
  ],
  type: 1,
};

const BULLET_COMMAND = {
  name: 'bill_spots',
  description: 'Get the bullet spots for a track',
  options: [
    {
      type: 3,
      name: 'track',
      description: 'Pick your track',
      required: true,
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [STRATEGY_COMMAND, BULLET_COMMAND];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: ALL_COMMANDS });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}