"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectIcon = void 0;
const react_1 = __importDefault(require("react"));
const icons_1 = require("./icons");
const selectIcon = type => {
    switch (type) {
        default:
            return react_1.default.createElement(icons_1.DefaultFileIcon, null);
    }
};
exports.selectIcon = selectIcon;
//# sourceMappingURL=parseIcon.js.map