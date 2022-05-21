import requests
import os
import transgif
from PIL import Image

a = {'jitters': 11, 'evolve': 11, 'girlboss': 11, 'crossfire': 11, 'gatekeep': 11, 'fume': 12, 'flip-out': 9, 'lash-out': 9, 'hash-out': 9, 'flush-out': 9, 'tear-out': 9, 'gaslight': 14, 'ice-slash': 10, 'flame-slash': 10, 'thorn-slash': 10, 'iron-slash': 10, 'sand-slash': 10, 'dark-blast': 7, 'dread-blast': 7, 'panic-ball': 9,
     'ball-of-despair': 9, 'ball-of-fury': 9, 'wrecking-ball': 9, 'aura-ball': 9, 'rage-blast': 7, 'mood-blast': 7, 'power-blast': 7, 'caught': 10, 'force-capture': 10, 'green-lightning': 11, 'pink-lightning': 11, 'isolate': 11, 'blue-lightning': 11, 'dismiss': 11, 'yellow-lightning': 11, 'fire-lightning': 11, 'red-lightning': 11}

base_url = 'http://img.voidpet.com/anim'

for i in a:
    os.mkdir(fr'.\{i}')
    for j in range(0, a[i]):
        r = requests.get(f'{base_url}/{i}-{j}.png')
        with open(fr'.\{i}\{j}.png', 'wb') as f:
            f.write(r.content)

    frames = []
    for k in range(0, a[i]):
        frames.append(transgif.convert(Image.open(fr'.\{i}\{k}.png')))

    frames[0].save(fr'.\{i}\{i}.gif', format='GIF',
                   append_images=frames[1:],
                   save_all=True,
                   duration=135, loop=0)
