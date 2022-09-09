import sharp from 'sharp';
import fs from 'fs';

let vivids = { Normal: ['black', '#3E3E60', 'white'], Phantom: ['#FFFFFF', '#E9E9F5', '#000000'], Ephemeral: ['#6096FF', '#66BFFF', '#D7E3FB'], Celestial: ['#FFBD14', '#FFD600', '#00CDCD'], Cataclysmic: ['#CD3966', '#FF0707', '#264CD3'], Jaded: ['#BFFFFF', '#D9D9FF', '#19E8E8'], Ethereal: ['#B8AEF9', '#EFCFCF', '#AAFFFF'], Illusive: ['#6B92DC', '#8EA0FF', '#DEAFF4'], Cryptic: ['#16798F', '#499CBF', '#67E4FF'], Arcane: ['#4C4C85', '#6363A1', '#FFFFFF'], Resolute: ['#506182', '#6D84B0', '#BAF3FF'], Fathomless: ['#000001', '#00033D', '#232D3D'], Elemental: ['#1C0C05', '#3A2504', '#FFE27C'], Corrosive: ['#031805', '#6FFF7D', '#FF4BB7'], Unidentified: ['#6EC2F0', '#77E1C8', '#FF0000'], Intoxicating: ['#3300FF', '#5D35FF', '#FF00E5'], Tartarean: ['#02000C', '#000089', '#FF0000'] };

let emotions = { Abandonment: 5, Anger: 5, Anxious: 5, Cringe: 5, Curiosity: 5, DownBad: 5, Envy: 5, Estrangement: 5, Gluttony: 5, Greed: 5, Grumpy: 5, Jealous: 5, Judgement: 5, Lonely: 5, Lust: 5, Nostalgia: 5, Pain: 5, Paranoia: 5, Pride: 5, Sad: 5, Sadge: 4, Salty: 5, Sanctimony: 5, Sloth: 5, Sonder: 5, Spite: 5, Wrath: 5 };

Object.keys(emotions).forEach(emotion => {
    for (let i = 1; i < emotions[emotion] + 1; i++) {
        let pet = fs.readFileSync(`./all_normal_svgs/${emotion}/${i}.txt`, 'utf-8').toString();
        Object.keys(vivids).forEach(vivid => {
            console.log(`${vivid} ${emotion} ${i} Large`);
            sharp(Buffer.from(pet.replaceAll('black', vivids[vivid][0]).replaceAll('white', vivids[vivid][2]).replaceAll('#3E3E60', vivids[vivid][1])))
                .resize(3840, 3840)
                .toFile(`./Large/${vivid}/${emotion}/${i}.png`, function (err) {});
        });
    }
});

Object.keys(emotions).forEach(emotion => {
    for (let i = 1; i < emotions[emotion] + 1; i++) {
        let pet = fs.readFileSync(`./all_normal_svgs/${emotion}/${i}.txt`, 'utf-8').toString();
        Object.keys(vivids).forEach(vivid => {
            console.log(`${vivid} ${emotion} ${i} Small`);
            sharp(Buffer.from(pet.replaceAll('black', vivids[vivid][0]).replaceAll('white', vivids[vivid][2]).replaceAll('#3E3E60', vivids[vivid][1])))
                .resize(1180, 1180)
                .toFile(`./${vivid}/${emotion}/${i}.png`, function (err) {});
        });
    }
});
