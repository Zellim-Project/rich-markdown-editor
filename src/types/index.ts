import * as React from "react";
import { EditorState, Transaction } from "prosemirror-state";

export enum ToastType {
  Error = "error",
  Info = "info"
}

export enum EventType {
  blockMenuOpen = "blockMenuOpen",
  blockMenuClose = "blockMenuClose",
  emojiMenuOpen = "emojiMenuOpen",
  emojiMenuClose = "emojiMenuClose",
  linkMenuOpen = "linkMenuOpen",
  linkMenuClose = "linkMenuClose"
}

export type MenuItem = {
  icon?: typeof React.Component | React.FC<any>;
  name?: string;
  title?: string;
  shortcut?: string;
  keywords?: string;
  tooltip?: string;
  defaultHidden?: boolean;
  attrs?: Record<string, any>;
  visible?: boolean;
  active?: (state: EditorState) => boolean;
};

export type EmbedDescriptor = MenuItem & {
  matcher: (url: string) => boolean | [] | RegExpMatchArray;
  component: typeof React.Component | React.FC<any>;
};

export type Dispatch = (tr: Transaction) => void;
