"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_commands_1 = require("prosemirror-commands");
const markInputRule_1 = __importDefault(require("../lib/markInputRule"));
const Mark_1 = __importDefault(require("./Mark"));
const heavyWeightRegex = /^(bold(er)?|[5-9]\d{2,})$/;
const normalWeightRegex = /^(normal|[1-4]\d{2,})$/;
class Bold extends Mark_1.default {
    get name() {
        return "strong";
    }
    get schema() {
        return {
            parseDOM: [
                {
                    tag: "b",
                    getAttrs: (dom) => normalWeightRegex.test(dom.style.fontWeight) ? false : null,
                },
                { tag: "strong" },
                {
                    style: "font-weight",
                    getAttrs: (style) => heavyWeightRegex.test(style) && null,
                },
            ],
            toDOM: () => ["strong"],
        };
    }
    inputRules({ type }) {
        return [(0, markInputRule_1.default)(/(?:\*\*)([^*]+)(?:\*\*)$/, type)];
    }
    keys({ type }) {
        return {
            "Mod-b": (0, prosemirror_commands_1.toggleMark)(type),
            "Mod-B": (0, prosemirror_commands_1.toggleMark)(type),
        };
    }
    toMarkdown() {
        return {
            open: "**",
            close: "**",
            mixable: true,
            expelEnclosingWhitespace: true,
        };
    }
    parseMarkdown() {
        return { mark: "strong" };
    }
}
exports.default = Bold;
//# sourceMappingURL=Bold.js.map