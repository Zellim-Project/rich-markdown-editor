import { wrappingInputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import { LinkIcon } from "outline-icons";
import * as React from "react";
import Node from "./Node";
import filesRule from "../rules/files";
import uploadFilePlaceholderPlugin from "../lib/uploadFilePlaceholder";
import getDataTransferFiles from "../lib/getDataTransferFiles";
import insertAllFiles from "../commands/insertAllFiles";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const uploadPlugin = options =>
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
            .map(dt => dt.getAsFile())
            .filter(file => file);

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
            !options.uploadImage
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
          getAttrs: (dom: HTMLDivElement) => ({
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
          ["div", { ...node.attrs, contentEditable: true }],
        ];
      },
    };
  }

  component = props => {
    const { alt, src, size, type } = props.node.attrs;
    return (
      <div contentEditable={false} className="embed-block">
        <div className="icon">
          <LinkIcon color="#898E9A" />
        </div>
        <div className="info">
          <a href={src} style={{ textDecoration: "none" }}>
            <p className="title">{alt}</p>
          </a>
          <p className="subtitle">
            {formatBytes(size)} • {type}
          </p>
        </div>
      </div>
    );
  };

  commands({ type }) {
    return attrs => toggleWrap(type, attrs);
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^@@@$/, type)];
  }

  toMarkdown(state, node) {
    state.write("\n@@@");
    state.write(
      "[" +
        state.esc(node.attrs.alt) +
        "]" +
        "(" +
        state.esc(node.attrs.src) +
        "&-&" +
        state.esc(node.attrs.size) +
        "&-&" +
        state.esc(node.attrs.type) +
        ")"
    );
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
        const [src, size, type] = result?.[2].split("&-&") || [];
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
    return [uploadFilePlaceholderPlugin, uploadPlugin(this.options)];
  }
}
