/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Token from "markdown-it/lib/token";
import { wrappingInputRule } from "prosemirror-inputrules";
import { NodeType, Node as ProsemirrorNode } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import { LinkIcon } from "outline-icons";
import * as React from "react";
import ReactDOM from "react-dom";
import Node from "./Node";
import filesRule from "../rules/files";
import uploadFilePlaceholderPlugin from "../lib/uploadFilePlaceholder";
import getDataTransferFiles from "../lib/getDataTransferFiles";
import insertAllFiles, { Options } from "../commands/insertAllFiles";
import { MarkdownSerializerState } from "../lib/markdown/serializer";

const uploadPlugin = (options: Options) =>
  new Plugin({
    props: {
      handleDOMEvents: {
        paste(view, event: ClipboardEvent): boolean {
          if (
            (view.props.editable && !view.props.editable(view.state)) ||
            !options.uploadFile
          ) {
            return false;
          }

          if (!event.clipboardData) return false;

          // check if we actually pasted any files
          const files = Array.prototype.slice
            .call(event.clipboardData.items)
            .map((dt: DataTransferItem) => dt.getAsFile())
            .filter((file: DataTransferItem) => file);

          if (files.length === 0) return false;

          const { tr } = view.state;
          if (!tr.selection.empty) {
            tr.deleteSelection();
          }
          const pos = tr.selection.from;

          insertAllFiles(view, event, pos, files, options);
          return true;
        },
        drop(view, event: DragEvent): boolean {
          if (
            (view.props.editable && !view.props.editable(view.state)) ||
            !options.uploadFile
          ) {
            return false;
          }

          const files = getDataTransferFiles(event);
          if (files.length === 0) {
            return false;
          }

          // grab the position in the document for the cursor
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
  get name() {
    return "container_file";
  }

  get rulePlugins() {
    return [filesRule];
  }

  get schema(): any {
    return {
      attrs: {
        src: {},
        alt: {
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
          getAttrs: (dom: HTMLDivElement) => ({
            alt: dom.className.includes("a"),
          }),
        },
      ],
      toDOM: (node: any) => {
        const a = document.createElement("a");
        a.href = node.attrs.src;
        const fileName = document.createTextNode(node.attrs.alt);
        a.appendChild(fileName);

        const component = <LinkIcon color="currentColor" />;

        const icon = document.createElement("div");
        icon.className = "icon";
        ReactDOM.render(component, icon);

        return [
          "div",
          { class: `file-block` },
          icon,
          a,
          ["div", { contentEditable: true }],
          ["div", { class: "content" }, 0],
        ];
      },
    };
  }

  commands({ type }: { type: NodeType }) {
    return (attrs: any) => toggleWrap(type, attrs);
  }

  inputRules({ type }: { type: NodeType }) {
    return [wrappingInputRule(/^@@@$/, type)];
  }

  toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode) {
    state.write("\n@@@");
    state.write(
      "[" +
        state.esc(node.attrs.alt || "", false) +
        "]" +
        "(" +
        state.esc(node.attrs.src || "", false) +
        ")"
    );
    state.ensureNewLine();
    state.write("@@@");
    state.closeBlock(node);
  }

  parseMarkdown() {
    return {
      block: "container_file",
      getAttrs: (token: Token) => {
        const file_regex = /\[(?<alt>[^]*?)\]\((?<filename>[^]*?)\)/g;
        const result = file_regex.exec(token.info);
        return {
          src: result ? result[2] : null,
          alt: result ? result[1] : null,
        };
      },
    };
  }

  get plugins() {
    return [uploadFilePlaceholderPlugin, uploadPlugin(this.options)];
  }
}
