import { ReactElement } from "react";
import ReactDOM from "react-dom";
import { ySyncPlugin, yCursorPlugin } from "y-prosemirror";
import EditorCursor from "../components/EditorCursor";
import Extension from "../lib/Extension";
import { Plugin } from "prosemirror-state";

function cursorBuilder(userInfo: Record<string, string>): HTMLElement {
  const cursor = document.createElement("span");
  const editorCursor = EditorCursor({
    userName: userInfo.name,
    userColor: userInfo.color
  });
  ReactDOM.render(editorCursor as ReactElement, cursor);
  return cursor;
}

const selectionBuilder = user => {
  return {
    style: `background-color: ${user.color}bd`,
    class: "ProseMirror-yjs-selection"
  };
};

export default class Sync extends Extension {
  get name(): string {
    return "sync";
  }

  get plugins(): Plugin[] {
    if (this.options.yXmlFragment && this.options.yProvider) {
      return [
        ySyncPlugin(this.options.yXmlFragment),
        yCursorPlugin(
          this.options.yProvider.awareness,
          {
            cursorBuilder,
            getSelection: state => state.selection,
            selectionBuilder
          },
          "cursor"
        )
      ];
    }
    return [];
  }
}
