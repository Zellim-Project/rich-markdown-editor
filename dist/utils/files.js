"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedImageMimeTypes = exports.bytesToHumanReadable = void 0;
const bytesToHumanReadable = (bytes) => {
    const out = ("0".repeat((bytes.toString().length * 2) % 3) + bytes).match(/.{3}/g);
    if (!out || bytes < 1000) {
        return bytes + " Bytes";
    }
    const f = out[1].substring(0, 2);
    return `${Number(out[0])}${f === "00" ? "" : `.${f}`} ${"  kMGTPEZY"[out.length]}B`;
};
exports.bytesToHumanReadable = bytesToHumanReadable;
exports.supportedImageMimeTypes = [
    "image/jpg",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/apng",
    "image/avif",
    "image/gif",
    "image/webp",
    "image/svg",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
];
//# sourceMappingURL=files.js.map