// Alan Baines

'use strict';

document.body.style.backgroundColor = "red";


async function process() {
    const original = document.getElementById('original').src;
    const image = await IJS.Image.load(original);

    const grey = image.clone();

    const flip = image.clone().flipX();

    console.log(IJS);
    console.log(IJS.Kernel);
    console.log(grey.getHistograms());
    console.log(grey)

    const padded = grey.pad({size:[500,0],algorithm:'set',color:[128,128,128,128]})

    const insert = padded.insert(flip).insert(flip,{x:1000,y:0})

    document.getElementById('grey').src = insert.toDataURL();

    document.body.style.backgroundColor = "orange";
}

process();

