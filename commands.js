import 'dotenv/config';
import {InstallGlobalCommands} from './utils.js';
import {tracks} from './src/track.js';

// Get the game choices from game.js
function createCommandChoices() {
  const commandChoices = [];

  for (const track of tracks.slice(0, 5)) {
    commandChoices.push({
      name: track.code,
      value: track.code,
    });
    commandChoices.push({
      name: track.name,
      value: track.code,
    });
    if (track.alt) {
      commandChoices.push({
        name: track.alt.code,
        value: track.code,
      });
      commandChoices.push({
        name: track.name,
        value: track.code,
      });
    }
  };

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

// Command containing options
const STRATEGY_COMMAND = {
  name: 'strategy',
  description: 'Get the strategy for a track',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your track',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND, STRATEGY_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);