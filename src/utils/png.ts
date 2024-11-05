export const generatePNG = (width: number, height: number, rawColors: Uint8ClampedArray) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;
    const imageData = ctx.createImageData(width, height);
    imageData.data.set(rawColors);
    ctx.putImageData(imageData, 0, 0);

    const base64 = canvas.toDataURL("image/png");

    return base64;
};
