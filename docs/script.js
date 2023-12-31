// Alan Baines

'use strict';

document.body.style.backgroundColor = "red";

const original = document.getElementById('original');

function getColorArray(image) {
    const channels = image.channels
    switch (channels) {
        case 3:
            return [128, 128, 128];
        case 4:
            return [128, 128, 128, 128];
        default:
            throw new Error('Unexpected number of image channels!');
    }
}

async function process() {
    try {
        const originalSrc = original.src;
        const image = await IJS.Image.load(originalSrc);

        const height = image.height;
        const width = image.width;

        console.log(width, height, image.channels);

        const colorArray = getColorArray(image);

        const flipX = image.clone().flipX();

        const padded = image.pad({ size: [width, 0], algorithm: 'set', color: colorArray });

        const insert = padded.insert(flipX).insert(flipX, { x: 2 * width, y: 0 })

        const flipY = insert.clone().flipY();

        const paddedUp = insert.pad({ size: [0, height], algorithm: 'set', color: colorArray });

        const insertUp = paddedUp.insert(flipY).insert(flipY, { x: 0, y: 2 * height });

        document.getElementById('result').src = insertUp.toDataURL();

        document.body.style.backgroundColor = "orange";
    } catch (error) {
        console.error(error);
        document.body.style.backgroundColor = "red";
    }
}

process();

const upload_input = document.getElementById('upload-input');

async function upload() {
    document.body.style.backgroundColor = "yellow";

    const upload_input = document.getElementById('upload-input');
    const file0 = this.files[0];
    const objectUrlFile0 = window.URL.createObjectURL(file0);

    original.src = objectUrlFile0;

    console.log(upload_input, upload_input.value, this.files[0]);

    process();
}

upload_input.onchange = upload;
