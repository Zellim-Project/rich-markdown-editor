"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_state_1 = require("prosemirror-state");
const toggleWrap_1 = __importDefault(require("../commands/toggleWrap"));
const outline_icons_1 = require("outline-icons");
const React = __importStar(require("react"));
const Node_1 = __importDefault(require("./Node"));
const files_1 = __importDefault(require("../rules/files"));
const uploadFilePlaceholder_1 = __importDefault(require("../lib/uploadFilePlaceholder"));
const getDataTransferFiles_1 = __importDefault(require("../lib/getDataTransferFiles"));
const insertAllFiles_1 = __importDefault(require("../commands/insertAllFiles"));
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
const uploadPlugin = options => new prosemirror_state_1.Plugin({
    props: {
        handleDOMEvents: {
            paste(view, event) {
                if ((view.props.editable && !view.props.editable(view.state)) ||
                    !options.uploadFile) {
                    return false;
                }
                if (!event.clipboardData)
                    return false;
                const files = Array.prototype.slice
                    .call(event.clipboardData.items)
                    .map(dt => dt.getAsFile())
                    .filter(file => file);
                if (files.length === 0)
                    return false;
                const { tr } = view.state;
                if (!tr.selection.empty) {
                    tr.deleteSelection();
                }
                const pos = tr.selection.from;
                insertAllFiles_1.default(view, event, pos, files, options);
                return true;
            },
            drop(view, event) {
                if ((view.props.editable && !view.props.editable(view.state)) ||
                    !options.uploadImage) {
                    return false;
                }
                const files = getDataTransferFiles_1.default(event);
                if (files.length === 0) {
                    return false;
                }
                const result = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });
                if (result) {
                    insertAllFiles_1.default(view, event, result.pos, files, options);
                    return true;
                }
                return false;
            },
        },
    },
});
class File extends Node_1.default {
    constructor() {
        super(...arguments);
        this.component = props => {
            const { alt, src, size, type } = props.node.attrs;
            return (React.createElement("div", { contentEditable: false, className: "embed-block" },
                React.createElement("div", { className: "icon" },
                    React.createElement(outline_icons_1.LinkIcon, { color: "#898E9A" })),
                React.createElement("div", { className: "info" },
                    React.createElement("a", { href: src, style: { textDecoration: "none" } },
                        React.createElement("p", { className: "title" }, alt)),
                    React.createElement("p", { className: "subtitle" },
                        formatBytes(size),
                        " \u2022 ",
                        type))));
        };
    }
    get name() {
        return "container_file";
    }
    get rulePlugins() {
        return [files_1.default];
    }
    get schema() {
        return {
            attrs: {
                src: {},
                alt: {
                    default: "",
                },
                size: {},
                type: {},
            },
            content: "block+",
            group: "block",
            defining: true,
            draggable: true,
            parseDOM: [
                {
                    tag: "div.file-block",
                    preserveWhitespace: "full",
                    contentElement: "div:last-child",
                    getAttrs: (dom) => ({
                        alt: dom.getElementsByClassName("title")[0].textContent,
                        src: dom.getElementsByTagName("a")[0].href,
                        size: dom.getElementsByClassName("subtitle")[0].textContent,
                        type: dom.getElementsByClassName("subtitle")[0].textContent,
                    }),
                },
            ],
            toDOM: node => {
                return [
                    "div",
                    { class: "embed-block" },
                    ["div", Object.assign(Object.assign({}, node.attrs), { contentEditable: true })],
                ];
            },
        };
    }
    commands({ type }) {
        return attrs => toggleWrap_1.default(type, attrs);
    }
    inputRules({ type }) {
        return [prosemirror_inputrules_1.wrappingInputRule(/^@@@$/, type)];
    }
    toMarkdown(state, node) {
        state.write("\n@@@");
        state.write("[" +
            state.esc(node.attrs.alt) +
            "]" +
            "(" +
            state.esc(node.attrs.src) +
            "&-&" +
            state.esc(node.attrs.size) +
            "&-&" +
            state.esc(node.attrs.type) +
            ")");
        state.ensureNewLine();
        state.write("@@@");
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "container_file",
            getAttrs: token => {
                const file_regex = /\[(?<alt>[^]*?)\]\((?<filename>[^]*?)\)/g;
                const result = file_regex.exec(token.info);
                const [src, size, type] = (result === null || result === void 0 ? void 0 : result[2].split("&-&")) || [];
                return {
                    src: result ? src : null,
                    size: result ? size : null,
                    type: result ? type : null,
                    alt: result ? result[1] : null,
                };
            },
        };
    }
    get plugins() {
        return [uploadFilePlaceholder_1.default, uploadPlugin(this.options)];
    }
}
exports.default = File;
//# sourceMappingURL=FileDoc.js.map