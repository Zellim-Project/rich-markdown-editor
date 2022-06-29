"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bold_1 = __importDefault(require("../marks/Bold"));
const Code_1 = __importDefault(require("../marks/Code"));
const Italic_1 = __importDefault(require("../marks/Italic"));
const Link_1 = __importDefault(require("../marks/Link"));
const Strikethrough_1 = __importDefault(require("../marks/Strikethrough"));
const Underline_1 = __importDefault(require("../marks/Underline"));
const Doc_1 = __importDefault(require("../nodes/Doc"));
const Emoji_1 = __importDefault(require("../nodes/Emoji"));
const HardBreak_1 = __importDefault(require("../nodes/HardBreak"));
const Image_1 = __importDefault(require("../nodes/Image"));
const Paragraph_1 = __importDefault(require("../nodes/Paragraph"));
const Text_1 = __importDefault(require("../nodes/Text"));
const History_1 = __importDefault(require("../plugins/History"));
const MaxLength_1 = __importDefault(require("../plugins/MaxLength"));
const PasteHandler_1 = __importDefault(require("../plugins/PasteHandler"));
const Placeholder_1 = __importDefault(require("../plugins/Placeholder"));
const SmartText_1 = __importDefault(require("../plugins/SmartText"));
const TrailingNode_1 = __importDefault(require("../plugins/TrailingNode"));
const basicPackage = [
    Doc_1.default,
    HardBreak_1.default,
    Paragraph_1.default,
    Emoji_1.default,
    Text_1.default,
    Image_1.default,
    Bold_1.default,
    Code_1.default,
    Italic_1.default,
    Underline_1.default,
    Link_1.default,
    Strikethrough_1.default,
    History_1.default,
    SmartText_1.default,
    TrailingNode_1.default,
    PasteHandler_1.default,
    Placeholder_1.default,
    MaxLength_1.default,
];
exports.default = basicPackage;
//# sourceMappingURL=basic.js.map