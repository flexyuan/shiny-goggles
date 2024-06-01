import {tracks, fuse} from "./track.js";
import {createStrategyMessage, createBillMessage} from "./formatter.js";
import {bulletSpots} from "./bullet-spots.js";

export function handleStartegyMessage(interaction) {
    const option = interaction.options.getString('track');
    const track = findTrack(option);
    if (track) {
        return interaction.reply(createStrategyMessage(track));
    } else {
        return interaction.reply(`No track found for ${option}`);
    }
}

export function handleBillMessage(interaction) {
    console.debug("Handling bill message");
    const option = interaction.options.getString('track');
    const track = findTrack(option);
    if (track) {
        const bullets = bulletSpots.filter(b => b.code === track.code && b.include);
        if (bullets.length === 0) {
            return interaction.reply(`No bullet spots found for ${track.name}`);
        }
        return interaction.reply(createBillMessage(track, bullets));
    } else {
        return interaction.reply(`No track found for ${option}`);
    }
}

function findTrack(option) {
    let track = tracks.find(t => t.code === option);
    if (track) {
        return track;
    }
    const results = fuse.search(option);
    if (results.length) {
        return results[0].item;
    }

}
