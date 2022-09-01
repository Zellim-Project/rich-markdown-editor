"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcon = void 0;
const getIcon = (name, mimetype) => {
    if (mimetype.includes("audio")) {
        return `/file-mp3.svg`;
    }
    if ((name === null || name === void 0 ? void 0 : name.split(".").length) > 1) {
        return `/file-${name.split(".").reverse()[0]}.svg`;
    }
    if ((mimetype === null || mimetype === void 0 ? void 0 : mimetype.split("/").length) > 1) {
        return `/file-${mimetype
            .split("/")
            .reverse()[0]
            .split(".")
            .reverse()[0]}.svg`;
    }
    return `/file-no-extension.svg`;
};
exports.getIcon = getIcon;
//# sourceMappingURL=parseIcon.js.map