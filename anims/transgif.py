from PIL import Image


def rounding(n):
    num = n[3]/255
    n = [round(i*num) for i in n[0:3]]
    return tuple(n)


def convert(img):
    img = img.convert('RGBA')
    new = []

    for i in img.getdata():
        new.append(rounding(i))

    img.putdata(new)

    return img
