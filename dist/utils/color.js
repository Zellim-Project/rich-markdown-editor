"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToColor = exports.validateColorHex = exports.palette = void 0;
const md5_1 = __importDefault(require("crypto-js/md5"));
const polished_1 = require("polished");
const theme_1 = __importDefault(require("../styles/theme"));
exports.palette = [
    theme_1.default.brand.red,
    theme_1.default.brand.blue,
    theme_1.default.brand.purple,
    theme_1.default.brand.pink,
    theme_1.default.brand.marine,
    theme_1.default.brand.green,
    theme_1.default.brand.yellow,
    (0, polished_1.darken)(0.2, theme_1.default.brand.red),
    (0, polished_1.darken)(0.2, theme_1.default.brand.blue),
    (0, polished_1.darken)(0.2, theme_1.default.brand.purple),
    (0, polished_1.darken)(0.2, theme_1.default.brand.pink),
    (0, polished_1.darken)(0.2, theme_1.default.brand.marine),
    (0, polished_1.darken)(0.2, theme_1.default.brand.green),
    (0, polished_1.darken)(0.2, theme_1.default.brand.yellow),
];
const validateColorHex = (color) => {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
};
exports.validateColorHex = validateColorHex;
const stringToColor = (input) => {
    const inputAsNumber = parseInt((0, md5_1.default)(input).toString(), 16);
    return exports.palette[inputAsNumber % exports.palette.length];
};
exports.stringToColor = stringToColor;
//# sourceMappingURL=color.js.map