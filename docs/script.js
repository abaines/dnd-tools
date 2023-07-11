// Alan Baines

'use strict';

document.body.style.backgroundColor = "red";


async function process() {
    const original = document.getElementById('original').src;
    const image = await IJS.Image.load(original);

    const height = image.height;
    const width = image.width;

    console.log(width, height);

    const flipX = image.clone().flipX();

    const padded = image.pad({size:[500,0],algorithm:'set',color:[128,128,128,128]})

    const insert = padded.insert(flipX).insert(flipX,{x:1000,y:0})

    const flipY = insert.clone().flipY();

    const paddedUp = insert.pad({size:[0,400],algorithm:'set',color:[128,128,128,128]})

    const insertUp = paddedUp.insert(flipY).insert(flipY,{x:0,y:800})

    document.getElementById('result').src = insertUp.toDataURL();

    document.body.style.backgroundColor = "orange";
}

process();

