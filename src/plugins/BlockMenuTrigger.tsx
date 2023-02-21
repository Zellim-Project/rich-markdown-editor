import { InputRule } from "prosemirror-inputrules";
import ReactDOM from "react-dom";
import * as React from "react";
import { EditorState, Plugin } from "prosemirror-state";
import { isInTable } from "prosemirror-tables";
import { findParentNode } from "prosemirror-utils";
import { PlusIcon } from "outline-icons";
import { Decoration, DecorationSet, EditorView } from "prosemirror-view";
import Extension from "../lib/Extension";
import { EventType } from "../types";

const MAX_MATCH = 500;
const OPEN_REGEX = /^(\f{1,2})?\/(\w+)?$/;
const CLOSE_REGEX = /(^(?!(\f{1,2})?\/(\w+)?)(.*)$|^\/(([\w\W]+)\s.*|\s)$|^\/((\W)+)$)/;

// based on the input rules code in Prosemirror, here:
// https://github.com/ProseMirror/prosemirror-inputrules/blob/master/src/inputrules.js
export function run(
  view: EditorView,
  from: number,
  to: number,
  regex: RegExp,
  handler: (
    state: EditorState,
    match: RegExpExecArray | null,
    from?: number,
    to?: number
  ) => boolean | null
): boolean {
  if (view.composing) {
    return false;
  }
  const state = view.state;
  const $from = state.doc.resolve(from);
  if ($from.parent.type.spec.code) {
    return false;
  }

  const textBefore = $from.parent.textBetween(
    Math.max(0, $from.parentOffset - MAX_MATCH),
    $from.parentOffset,
    undefined,
    "\ufffc"
  );

  const match = regex.exec(textBefore);
  return !!handler(state, match, match ? from - match[0].length : from, to);
}

export default class BlockMenuTrigger extends Extension {
  get name() {
    return "blockmenu";
  }

  get plugins() {
    const button = document.createElement("button");
    button.className = "block-menu-trigger";
    button.type = "button";
    ReactDOM.render(<PlusIcon color="currentColor" />, button);

    return [
      new Plugin({
        props: {
          handleClick: () => {
            this.editor.events.emit(EventType.blockMenuClose);
            return false;
          },
          handleKeyDown: (view, event) => {
            // Prosemirror input rules are not triggered on backspace, however
            // we need them to be evaluted for the filter trigger to work
            // correctly. This additional handler adds inputrules-like handling.
            if (event.key === "Backspace") {
              // timeout ensures that the delete has been handled by prosemirror
              // and any characters removed, before we evaluate the rule.
              setTimeout(() => {
                const { pos } = view.state.selection.$from;
                return run(view, pos, pos, OPEN_REGEX, (state, match) => {
                  if (match) {
                    this.editor.events.emit(EventType.blockMenuOpen, match[2]);
                  } else {
                    this.editor.events.emit(EventType.blockMenuClose);
                  }
                  return null;
                });
              });
            }

            // If the query is active and we're navigating the block menu then
            // just ignore the key events in the editor itself until we're done
            if (
              event.key === "Enter" ||
              event.key === "ArrowUp" ||
              event.key === "ArrowDown" ||
              event.key === "Tab"
            ) {
              const { pos } = view.state.selection.$from;

              return run(view, pos, pos, OPEN_REGEX, (state, match) => {
                // just tell Prosemirror we handled it and not to do anything
                return match ? true : null;
              });
            }

            return false;
          },
          decorations: (state) => {
            const parent = findParentNode(
              (node) => node.type.name === "paragraph"
            )(state.selection);

            if (!parent) {
              return;
            }

            const isTopLevel = state.selection.$from.depth === 1;
            if (!isTopLevel) {
              return;
            }

            const decorations: Decoration[] = [];
            const isEmptyNode = parent && parent.node.content.size === 0;
            const nodeTex = parent.node.textContent;
            const isSlash = ["/", "\f\f/"].includes(nodeTex);

            if (isEmptyNode || !nodeTex || ["\f\f", "\f"].includes(nodeTex)) {
              decorations.push(
                Decoration.widget(
                  parent.pos,
                  () => {
                    button.addEventListener("click", () => {
                      this.editor.events.emit(EventType.blockMenuOpen, "");
                    });
                    return button;
                  },
                  {
                    key: "block-trigger",
                  }
                )
              );

              decorations.push(
                Decoration.node(parent.pos, parent.pos + parent.node.nodeSize, {
                  class: "placeholder",
                  "data-empty-text": this.options.dictionary.newLineEmpty,
                })
              );
            } else if (isSlash) {
              decorations.push(
                Decoration.node(parent.pos, parent.pos + parent.node.nodeSize, {
                  class: "placeholder",
                  "data-empty-text": `  ${this.options.dictionary.newLineWithSlash}`,
                })
              );
            }

            return DecorationSet.create(state.doc, decorations);
          },
        },
      }),
    ];
  }

  inputRules() {
    return [
      // main regex should match only:
      // /word
      new InputRule(OPEN_REGEX, (state, match) => {
        if (
          match &&
          state.selection.$from.parent.type.name === "paragraph" &&
          !isInTable(state)
        ) {
          this.editor.events.emit(EventType.blockMenuOpen, match[2]);
        }
        return null;
      }),
      // invert regex should match some of these scenarios:
      // /<space>word
      // /<space>
      // /word<space>
      new InputRule(CLOSE_REGEX, (state, match) => {
        if (match) {
          this.editor.events.emit(EventType.blockMenuClose);
        }
        return null;
      }),
    ];
  }
}
