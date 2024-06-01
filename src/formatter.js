import {strategies} from "./strategy.js";
import {EmbedBuilder} from 'discord.js';

export function createStrategyMessage(track) {
    const strategy = strategies.find(s => s.code === track.code);
    if (!strategy) {
        return `No strategy found for ${track.name}`;
    }
    const name = track.name;
    const code = track.code;
    const type = strategy.type;
    const bestPlacement = strategy.bestPlacement;
    const description = strategy.description;
    const trackIconImage = `https://raw.githubusercontent.com/flexyuan/urban-pancake/main/assets/track-icon/${code}.png`
    const message = new EmbedBuilder()
        .setTitle(`${name} (${code}) Strategy`)
        .setThumbnail(trackIconImage)
        .setDescription(description)
        .addFields(
            {name: 'Type', value: type, inline: true},
            {name: 'Best Placement', value: bestPlacement, inline: true},
        )
        .setColor(0xFA5192)
    return {embeds: [message]};
}

export function createBillMessage(track, bullets) {
    const messages = [];
    const name = track.name;
    const code = track.code;
    let counter = 1;
    for (const bullet of bullets) {
        const duration = bullet.duration;
        const number = bullet.number;
        const videoSrc = `https://raw.githubusercontent.com/flexyuan/urban-pancake/main/assets/bullet-spots/video/${code}-${number}.mp4`; // Video source
        // const imageSrc = `https://raw.githubusercontent.com/flexyuan/urban-pancake/main/assets/bullet-spots/image/${code}-${number}.png`; // Image source
        const description = `${bullet.description + "\n" || ''}${videoSrc}`;
        const message = new EmbedBuilder()
            .setTitle(`${name} Bullet Spot #${counter}`)
            .addFields(
                {name: 'Duration', value: `${duration}s`, inline: true},
            )
            .setURL(videoSrc)
            .setImage(imageSrc)
            .setColor(0xFA5192);
        if (description) {
            message.setDescription(description);
        }
        messages.push(message);
        counter++;
    }
    return {embeds: messages};
}