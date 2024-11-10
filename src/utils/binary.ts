export const readBlockAsString = (arrayBuffer: ArrayBuffer, start: number, end: number): string => {
    const decoder = new TextDecoder("utf-8");
    const slice = arrayBuffer.slice(start, end);
    const str = decoder.decode(slice);
    return str?.replaceAll("\u0000", "");
};

export const int32ToUtf8String = (int32: number): string => {
    // Create a buffer to hold the bytes
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    // Set the Int32 value
    view.setInt32(0, int32, false); // 'false' for big-endian, 'true' for little-endian

    // Convert the buffer to a Uint8Array
    const byteArray = new Uint8Array(buffer);

    // Use TextDecoder to convert bytes to a string
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(byteArray);
};
