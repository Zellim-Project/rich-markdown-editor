import { NodeSpec, NodeType, Node as ProsemirrorNode } from "prosemirror-model";
import { Transaction, EditorState, Plugin } from "prosemirror-state";
import { DecorationSet } from "prosemirror-view";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import { Dispatch } from "../types";
import Node from "./Node";
export default class ListItem extends Node {
    get name(): string;
    get schema(): NodeSpec;
    get plugins(): Plugin<DecorationSet<any>, any>[];
    keys({ type }: {
        type: NodeType;
    }): {
        Enter: (state: EditorState<any>, dispatch?: ((tr: Transaction<any>) => void) | undefined) => boolean;
        Tab: (state: EditorState<any>, dispatch?: ((tr: Transaction<any>) => void) | undefined) => boolean;
        "Shift-Tab": (state: EditorState<any>, dispatch?: ((tr: Transaction<any>) => void) | undefined) => boolean;
        "Mod-]": (state: EditorState<any>, dispatch?: ((tr: Transaction<any>) => void) | undefined) => boolean;
        "Mod-[": (state: EditorState<any>, dispatch?: ((tr: Transaction<any>) => void) | undefined) => boolean;
        "Shift-Enter": (state: EditorState, dispatch: Dispatch) => boolean;
        "Alt-ArrowUp": (state: EditorState, dispatch: Dispatch) => boolean;
        "Alt-ArrowDown": (state: EditorState, dispatch: Dispatch) => boolean;
    };
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
    };
}
//# sourceMappingURL=ListItem.d.ts.map