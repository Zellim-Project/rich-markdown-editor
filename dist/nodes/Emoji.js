"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const name_to_emoji_json_1 = __importDefault(require("gemoji/name-to-emoji.json"));
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_state_1 = require("prosemirror-state");
const BlockMenuTrigger_1 = require("../plugins/BlockMenuTrigger");
const isInCode_1 = __importDefault(require("../queries/isInCode"));
const emoji_1 = __importDefault(require("../rules/emoji"));
const types_1 = require("../types");
const Node_1 = __importDefault(require("./Node"));
const OPEN_REGEX = /(?:^|\s):([0-9a-zA-Z_+-]+)?$/;
const CLOSE_REGEX = /(?:^|\s):(([0-9a-zA-Z_+-]*\s+)|(\s+[0-9a-zA-Z_+-]+)|[^0-9a-zA-Z_+-]+)$/;
class Emoji extends Node_1.default {
    get name() {
        return "emoji";
    }
    get schema() {
        return {
            attrs: {
                style: {
                    default: "",
                },
                "data-name": {
                    default: undefined,
                },
            },
            inline: true,
            content: "text*",
            marks: "",
            group: "inline",
            selectable: false,
            parseDOM: [
                {
                    tag: "span.emoji",
                    preserveWhitespace: "full",
                    getAttrs: (dom) => ({
                        "data-name": dom.dataset.name,
                    }),
                },
            ],
            toDOM: node => {
                if (name_to_emoji_json_1.default[node.attrs["data-name"]]) {
                    const text = document.createTextNode(name_to_emoji_json_1.default[node.attrs["data-name"]]);
                    return [
                        "span",
                        {
                            class: `emoji ${node.attrs["data-name"]}`,
                            "data-name": node.attrs["data-name"],
                        },
                        text,
                    ];
                }
                const text = document.createTextNode(`:${node.attrs["data-name"]}:`);
                return ["span", { class: "emoji" }, text];
            },
        };
    }
    get rulePlugins() {
        return [emoji_1.default];
    }
    get plugins() {
        return [
            new prosemirror_state_1.Plugin({
                props: {
                    handleClick: () => {
                        this.editor.events.emit(types_1.EventType.emojiMenuClose);
                        return false;
                    },
                    handleKeyDown: (view, event) => {
                        if (event.key === "Backspace") {
                            setTimeout(() => {
                                const { pos } = view.state.selection.$from;
                                return (0, BlockMenuTrigger_1.run)(view, pos, pos, OPEN_REGEX, (state, match) => {
                                    if (match) {
                                        this.editor.events.emit(types_1.EventType.emojiMenuOpen, match[1]);
                                    }
                                    else {
                                        this.editor.events.emit(types_1.EventType.emojiMenuClose);
                                    }
                                    return null;
                                });
                            });
                        }
                        if (event.key === "Enter" ||
                            event.key === "ArrowUp" ||
                            event.key === "ArrowDown" ||
                            event.key === "Tab") {
                            const { pos } = view.state.selection.$from;
                            return (0, BlockMenuTrigger_1.run)(view, pos, pos, OPEN_REGEX, (state, match) => {
                                return match ? true : null;
                            });
                        }
                        return false;
                    },
                },
            }),
        ];
    }
    commands({ type }) {
        return (attrs) => (state, dispatch) => {
            const { selection } = state;
            const position = selection instanceof prosemirror_state_1.TextSelection
                ? selection.$cursor?.pos
                : selection.$to.pos;
            if (position === undefined) {
                return false;
            }
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction);
            return true;
        };
    }
    inputRules({ type }) {
        return [
            new prosemirror_inputrules_1.InputRule(/^:([a-zA-Z0-9_+-]+):$/, (state, match, start, end) => {
                const [okay, markup] = match;
                const { tr } = state;
                if (okay) {
                    tr.replaceWith(start - 1, end, type.create({
                        "data-name": markup,
                        markup,
                    }));
                }
                return tr;
            }),
            new prosemirror_inputrules_1.InputRule(OPEN_REGEX, (state, match) => {
                if (match &&
                    state.selection.$from.parent.type.name === "paragraph" &&
                    !(0, isInCode_1.default)(state)) {
                    this.editor.events.emit(types_1.EventType.emojiMenuOpen, match[1]);
                }
                return null;
            }),
            new prosemirror_inputrules_1.InputRule(CLOSE_REGEX, (state, match) => {
                if (match) {
                    this.editor.events.emit(types_1.EventType.emojiMenuClose);
                }
                return null;
            }),
        ];
    }
    toMarkdown(state, node) {
        const name = node.attrs["data-name"];
        if (name) {
            state.write(`:${name}:`);
        }
    }
    parseMarkdown() {
        return {
            node: "emoji",
            getAttrs: (tok) => {
                return { "data-name": tok.markup.trim() };
            },
        };
    }
}
exports.default = Emoji;
//# sourceMappingURL=Emoji.js.map