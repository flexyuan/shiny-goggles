import {strategies} from "./strategy.js";

export function createStrategyMessage(track) {

    const strategy = strategies.find(s => s.code === track.code);
    if (!strategy) {
        return `No strategy found for ${track.name}`;
    }

    const name = track.name;
    const type = strategy.type;
    const bestPlacement = strategy.bestPlacement;
    const description = strategy.description;
    return `**Name:** ${name}\n**Type:** ${type}\n**Best Placement:** ${bestPlacement}\n**Description:** ${description}`;
}