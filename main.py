import requests
import os

variants = {0: 'Tartarean', 1: 'Intoxicating', 2: 'Unidentified', 3: 'Corrosive', 4: 'Elemental', 5: 'Fathomless', 6: 'Resolute',
            7: 'Arcane', 8: 'Cryptic', 9: 'Illusive', 10: 'Ethereal', 11: 'Jaded', 12: 'Cataclysmic', 13: 'Celestial', 14: 'Ephemeral', 15: 'Phantom'}

emotions = {'Abandonment': 5, 'Anger': 5, 'Anxious': 5, 'Cringe': 1, 'DownBad': 5, 'Envy': 5, 'Estrangement': 5, 'Gluttony': 5, 'Greed': 5, 'Jealous': 5, 'Judgement': 5,
            'Lonely': 5, 'Lust': 5, 'Nostalgia': 5, 'Pain': 5, 'Paranoia': 5, 'Pride': 5, 'Sad': 5, 'Sadge': 4, 'Salty': 5, 'Sanctimony': 5, 'Sloth': 5, 'Sonder': 5, 'Spite': 5, 'Wrath': 5}

os.mkdir(r'.\all_variants')

for x in variants:
    os.mkdir(fr'.\all_variants\{variants[x]}')
    for i in emotions:
        os.mkdir(fr'.\all_variants\{variants[x]}\{i}')
        for j in range(1, emotions[i]+1):
            img = requests.get(
                f'https://img.voidpet.com/thumbnail/{i}{j}-{x}.jpg')

            with open(fr'.\all_variants\{variants[x]}\{i}\{j}.jpg', 'wb') as f:
                f.write(img.content)
