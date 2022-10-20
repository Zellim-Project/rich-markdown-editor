import { wrappingInputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import { LinkedDoc } from "../lib/icons";
import * as React from "react";
import { linkDocumentPlaceholder } from "../lib/embedSimplePlaceHolder";
import Node from "./Node";
import linkDocumentRules from "../rules/linkDocument";
export default class EmbedTask extends Node {
    constructor() {
        super(...arguments);
        this.component = (props) => {
            const { docId, docName, icon } = props.node.attrs;
            const { openDocument } = this.editor.props;
            return (React.createElement("div", { contentEditable: false, className: "embed-block mentioned-document", onClick: () => openDocument?.(docId) },
                React.createElement("div", { className: "mentioned-icon my-4" }, icon ? React.createElement("span", { className: "emoji" }, icon) : React.createElement(LinkedDoc, null)),
                React.createElement("div", { className: "mentioned-info" },
                    React.createElement("p", { className: "doc-id" }, docId),
                    React.createElement("p", { className: "title" }, docName))));
        };
    }
    get name() {
        return "container_link_doc";
    }
    get schema() {
        return {
            attrs: {
                docId: {
                    default: "",
                },
                docName: {
                    default: "",
                },
                icon: {
                    default: "",
                },
            },
            content: "block+",
            group: "block",
            defining: true,
            draggable: false,
            parseDOM: [
                {
                    tag: "div.embed-block.mentioned-document",
                    preserveWhitespace: "full",
                    contentElement: "div.info",
                    getAttrs: (dom) => ({
                        docName: dom.getElementsByClassName("title")[0].textContent,
                        docId: dom.getElementsByClassName("doc-id")[0].textContent,
                        icon: dom.getElementsByClassName("emoji")[0].textContent,
                    }),
                },
            ],
            toDOM: (node) => {
                return [
                    "div",
                    { class: "embed-block mentioned-document" },
                    ["p", { ...node.attrs, contentEditable: false }],
                ];
            },
        };
    }
    commands({ type }) {
        return (attrs) => toggleWrap(type, attrs);
    }
    get rulePlugins() {
        return [linkDocumentRules];
    }
    inputRules({ type }) {
        return [wrappingInputRule(/^\$-\$-\$-$/, type)];
    }
    toMarkdown(state, node) {
        state.ensureNewLine();
        state.write("\\\\");
        state.ensureNewLine();
        state.write("$-$-$-");
        state.write("[" +
            state.esc(node.attrs.docId) +
            "]" +
            "(" +
            state.esc(node.attrs.docName) +
            "&-&" +
            state.esc(node.attrs.icon) +
            ")");
        state.ensureNewLine();
        state.write("$-$-$-");
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "container_link_doc",
            getAttrs: (token) => {
                const file_regex = /\[(?<docId>[^]*?)\]\((?<docName>[^]*?)\)/g;
                const result = file_regex.exec(token.info);
                const [docName, icon] = result?.[2]?.split("&-&") || [];
                const docId = result?.[1] || "";
                return {
                    docId: result ? docId : null,
                    docName: result ? docName : null,
                    icon: result ? icon : null,
                };
            },
        };
    }
    get plugins() {
        return [linkDocumentPlaceholder, new Plugin({})];
    }
}
//# sourceMappingURL=linkDocument.js.map