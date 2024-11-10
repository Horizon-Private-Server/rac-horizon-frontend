/**
 *
 * Class for PIF2 textures from the Ratchet & Clank PS2 series.
 *
 */

import { Sink, read_i32, read_u32, read_u8 } from "ts-binary";
import { int32ToUtf8String } from "./binary";

enum TextureFormat {
    PIF_8BPP_UYA_FORMAT = 0x13,
    PIF_8BPP_DL_FORMAT = 0x93,
    PIF_4BPP_UYA_FORMAT = 0x14,
    PIF_4BPP_DL_FORMAT = 0x94,
}

type Color = {
    R: number;
    G: number;
    B: number;
    A: number;
};

export class PIF2 {
    /**
     * Header
     */
    magic: string;
    fileSize: number;
    width: number;
    height: number;
    texFormat: TextureFormat;
    clutFormat: number;
    clutOrder: number;
    mipLevels: number;

    /**
     * Data
     */
    colors: Color[];
    pixels: number[];

    constructor(data: Sink) {
        this.magic = int32ToUtf8String(read_u32(data));

        if (this.magic !== "PIF2") throw new Error("Invalid format provided. Texture file must be PIF2 format.");

        this.fileSize = read_i32(data);
        this.height = read_i32(data);
        this.width = read_i32(data);
        this.texFormat = read_i32(data);
        this.clutFormat = read_i32(data);
        this.clutOrder = read_i32(data);
        this.mipLevels = read_i32(data);
        this.colors = [];
        this.pixels = [];

        switch (this.texFormat) {
            case TextureFormat.PIF_8BPP_UYA_FORMAT:
                this.read_8bpp_uya(data);
                break;
            case TextureFormat.PIF_8BPP_DL_FORMAT:
                this.read_8bpp_dl(data);
                break;
            case TextureFormat.PIF_4BPP_UYA_FORMAT:
                this.read_4bpp_uya(data);
                break;
            case TextureFormat.PIF_4BPP_DL_FORMAT:
                this.read_4bpp_dl(data);
                break;
        }
    }

    private read_8bpp_uya(data: Sink) {
        // Read the palette colors
        for (let i = 0; i < 256; i++) {
            const r = read_u8(data);
            const g = read_u8(data);
            const b = read_u8(data);
            const a = read_u8(data);
            this.colors.push({ R: r, G: g, B: b, A: a });
        }

        // Read the pixels
        for (let i = 0; i < this.height * this.width; i++) {
            this.pixels.push(read_u8(data));
        }
    }

    private read_8bpp_dl(data: Sink) {
        throw new Error("Not implemented");
    }

    private read_4bpp_uya(data: Sink) {
        throw new Error("Not implemented");
    }

    private read_4bpp_dl(data: Sink) {
        throw new Error("Not implemented");
    }

    public getColor(index: number) {
        return this.colors[this.decodePaletteIndex(index)];
    }

    private decodePaletteIndex(index: number, high: number = 4, low: number = 3) {
        const dif = high - low;
        const mask1 = 1 << high;
        const mask2 = 1 << low;
        const mask3 = ~(mask1 | mask2);
        const a = index & mask3;

        return ((index & mask1) >> dif) | ((index & mask2) << dif) | a;
    }
}
