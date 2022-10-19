import { wrappingInputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import { Union } from "../lib/icons";
import * as React from "react";
import { mentionDocumentPlaceholder } from "../lib/embedSimplePlaceHolder";
import Node from "./Node";
import mentionDocumentRules from "../rules/mentionDocument";

export default class EmbedTask extends Node {
  get name() {
    return "mention_doc";
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
          tag: "div.embed-block",
          preserveWhitespace: "full",
          contentElement: "div.info",
          getAttrs: (dom: HTMLDivElement) => ({
            docName: dom.getElementsByClassName("title")[0].textContent,
            docId: dom.getElementsByClassName("doc-id")[0].textContent,
            icon: dom.getElementsByClassName("emoji")[0].textContent,
          }),
        },
      ],
      toDOM: (node) => {
        return [
          "div",
          { class: "embed-block" },
          ["p", { ...node.attrs, contentEditable: false }],
        ];
      },
    };
  }

  component = (props) => {
    const { docId, docName, icon } = props.node.attrs;
    const { openDocument } = this.editor.props;
    return (
      <div
        contentEditable={false}
        className="embed-block"
        onClick={() => openDocument?.(docId)}
      >
        <div className="mentioned-icon my-2 ms-2">
          {icon ? <span className="me-3 emoji">{icon}</span> : <Union />}
        </div>
        <div className="mentioned-info">
          <p className="doc-id">{docId}</p>
          <p className="title">{docName}</p>
        </div>
      </div>
    );
  };

  commands({ type }) {
    return (attrs) => toggleWrap(type, attrs);
  }

  get rulePlugins() {
    return [mentionDocumentRules];
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^\(-\(-\(-$/, type)];
  }

  toMarkdown(state, node) {
    state.ensureNewLine();
    state.write("\\\\");
    state.ensureNewLine();
    state.write("(-(-(-");
    state.write(
      "[" +
        state.esc(node.attrs.docId) +
        "]" +
        "(" +
        state.esc(node.attrs.docName) +
        "&-&" +
        state.esc(node.attrs.icon) +
        ")"
    );
    state.ensureNewLine();
    state.write("(-(-(-");
    state.closeBlock(node);
  }

  parseMarkdown() {
    return {
      block: "mention_doc",
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
    return [mentionDocumentPlaceholder, new Plugin({})];
  }
}
