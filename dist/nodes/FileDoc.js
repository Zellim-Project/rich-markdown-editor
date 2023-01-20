import { wrappingInputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import * as React from "react";
import Node from "./Node";
import filesRule from "../rules/files";
import uploadFilePlaceholderPlugin from "../lib/uploadFilePlaceholder";
import getDataTransferFiles from "../lib/getDataTransferFiles";
import insertAllFiles from "../commands/insertAllFiles";
import { getIcon } from "../lib/parseIcon";
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
const uploadPlugin = (options) => new Plugin({
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
                    .map((dt) => dt.getAsFile())
                    .filter((file) => file);
                if (files.length === 0)
                    return false;
                const { tr } = view.state;
                if (!tr.selection.empty) {
                    tr.deleteSelection();
                }
                const pos = tr.selection.from;
                insertAllFiles(view, event, pos, files, options);
                return true;
            },
            drop(view, event) {
                if ((view.props.editable && !view.props.editable(view.state)) ||
                    !options.uploadImage) {
                    return false;
                }
                const files = getDataTransferFiles(event);
                if (files.length === 0) {
                    return false;
                }
                const result = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });
                if (result) {
                    insertAllFiles(view, event, result.pos, files, options);
                    return true;
                }
                return false;
            },
        },
    },
});
export default class File extends Node {
    constructor() {
        super(...arguments);
        this.component = (props) => {
            const { alt, fileName, size, type, mimeType } = props.node.attrs;
            const { downloadAFile } = this.editor.props;
            return (React.createElement("div", { contentEditable: false, className: "embed-block", onClick: () => downloadAFile?.({ key: fileName, fileName: alt }) },
                React.createElement("div", { className: "file-icon" },
                    React.createElement("img", { src: `/assets/images/files${getIcon(alt, mimeType)}`, alt: "file-icon" })),
                React.createElement("div", { className: "info" },
                    React.createElement("span", { className: "mimetype" }, mimeType),
                    React.createElement("span", { className: "filename" }, fileName),
                    React.createElement("p", { className: "title" }, alt),
                    React.createElement("p", { className: "subtitle" },
                        React.createElement("span", { className: "file-size" },
                            formatBytes(Number(size)),
                            " "),
                        "\u2022",
                        " ",
                        React.createElement("span", { className: "file-type" }, type.toUpperCase())))));
        };
    }
    get name() {
        return "container_file";
    }
    get rulePlugins() {
        return [filesRule];
    }
    get schema() {
        return {
            attrs: {
                fileName: {},
                alt: {
                    default: "",
                },
                size: {
                    default: "",
                },
                type: {
                    default: "",
                },
                mimeType: {
                    default: "",
                },
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
                        fileName: dom.getElementsByClassName("filename")[0].textContent,
                        size: dom.getElementsByClassName("file-size")[0].textContent,
                        type: dom.getElementsByClassName("file-type")[0].textContent,
                        mimeType: dom.getElementsByClassName("mimeType")[0].textContent,
                    }),
                },
            ],
            toDOM: (node) => {
                return [
                    "div",
                    { class: "embed-block" },
                    ["div", { ...node.attrs, contentEditable: true }],
                ];
            },
        };
    }
    commands({ type }) {
        return (attrs) => toggleWrap(type, attrs);
    }
    inputRules({ type }) {
        return [wrappingInputRule(/^@@@$/, type)];
    }
    toMarkdown(state, node) {
        state.write("\n@@@");
        state.write("[" +
            state.esc(node.attrs.alt) +
            "]" +
            "(" +
            state.esc(node.attrs.fileName) +
            "&-&" +
            state.esc(node.attrs.size) +
            "&-&" +
            state.esc(node.attrs.type) +
            "&-&" +
            state.esc(node.attrs.mimeType) +
            ")");
        state.ensureNewLine();
        state.write("@@@");
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "container_file",
            getAttrs: (token) => {
                const file_regex = /\[(?<alt>[^]*?)\]\((?<filename>[^]*?)\)/g;
                const result = file_regex.exec(token.info);
                const [fileName, size, type, mimeType] = result?.[2].split("&-&") || [];
                return {
                    fileName: result ? fileName : null,
                    size: result ? size : null,
                    type: result ? type : null,
                    mimeType: result ? mimeType : null,
                    alt: result ? result[1] : null,
                };
            },
        };
    }
    get plugins() {
        return [uploadFilePlaceholderPlugin, uploadPlugin(this.options)];
    }
}
//# sourceMappingURL=FileDoc.js.map