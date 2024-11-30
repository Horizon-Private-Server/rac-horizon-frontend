export const generatePNG = (width: number, height: number, rawColors: Uint8ClampedArray, preserveAlpha: boolean = true) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    if (!preserveAlpha) maximizeOpacity(rawColors);

    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(rawColors);
    ctx.putImageData(imageData, 0, 0);

    const base64 = canvas.toDataURL("image/png");

    return base64;
};

export const maximizeOpacity = (array: Uint8ClampedArray) => {
    for (let i = 4 - 1; i < array.length; i += 4) {
        array[i] = 255;
    }
};
