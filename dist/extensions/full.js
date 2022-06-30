"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Highlight_1 = __importDefault(require("../marks/Highlight"));
const Placeholder_1 = __importDefault(require("../marks/Placeholder"));
const Blockquote_1 = __importDefault(require("../nodes/Blockquote"));
const BulletList_1 = __importDefault(require("../nodes/BulletList"));
const CheckboxItem_1 = __importDefault(require("../nodes/CheckboxItem"));
const CheckboxList_1 = __importDefault(require("../nodes/CheckboxList"));
const CodeBlock_1 = __importDefault(require("../nodes/CodeBlock"));
const CodeFence_1 = __importDefault(require("../nodes/CodeFence"));
const Embed_1 = __importDefault(require("../nodes/Embed"));
const FileDoc_1 = __importDefault(require("../nodes/FileDoc"));
const Heading_1 = __importDefault(require("../nodes/Heading"));
const HorizontalRule_1 = __importDefault(require("../nodes/HorizontalRule"));
const ListItem_1 = __importDefault(require("../nodes/ListItem"));
const Notice_1 = __importDefault(require("../nodes/Notice"));
const OrderedList_1 = __importDefault(require("../nodes/OrderedList"));
const Table_1 = __importDefault(require("../nodes/Table"));
const TableCell_1 = __importDefault(require("../nodes/TableCell"));
const TableHeadCell_1 = __importDefault(require("../nodes/TableHeadCell"));
const TableRow_1 = __importDefault(require("../nodes/TableRow"));
const BlockMenuTrigger_1 = __importDefault(require("../plugins/BlockMenuTrigger"));
const Folding_1 = __importDefault(require("../plugins/Folding"));
const Keys_1 = __importDefault(require("../plugins/Keys"));
const basic_1 = __importDefault(require("./basic"));
const fullPackage = [
    ...basic_1.default,
    CodeBlock_1.default,
    CodeFence_1.default,
    CheckboxList_1.default,
    CheckboxItem_1.default,
    Blockquote_1.default,
    BulletList_1.default,
    OrderedList_1.default,
    Embed_1.default,
    FileDoc_1.default,
    ListItem_1.default,
    Notice_1.default,
    Heading_1.default,
    HorizontalRule_1.default,
    Table_1.default,
    TableCell_1.default,
    TableHeadCell_1.default,
    TableRow_1.default,
    Highlight_1.default,
    Placeholder_1.default,
    Folding_1.default,
    Keys_1.default,
    BlockMenuTrigger_1.default,
];
exports.default = fullPackage;
//# sourceMappingURL=full.js.map