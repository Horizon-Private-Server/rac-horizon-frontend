export const readBlockAsString = (arrayBuffer: ArrayBuffer, start: number, end: number): string => {
    const decoder = new TextDecoder();
    const slice = arrayBuffer.slice(start, end);
    return decoder.decode(slice);
};
