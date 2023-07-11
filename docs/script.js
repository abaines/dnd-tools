// Alan Baines

'use strict';

document.body.style.backgroundColor = "red";


async function process() {
    const original = document.getElementById('original').src;
    const image = await IJS.Image.load(original);

    const grey = image.grey();

    document.getElementById('grey').src = grey.toDataURL();

    document.body.style.backgroundColor = "orange";
}

process();

