import { NodeSpec, Node as ProsemirrorNode, NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import { Dispatch } from "../types";
import Node from "./Node";
export default class Blockquote extends Node {
    get name(): string;
    get schema(): NodeSpec;
    inputRules({ type }: {
        type: NodeType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    commands({ type }: {
        type: NodeType;
    }): () => (state: EditorState<any>, dispatch?: Dispatch | undefined) => boolean;
    keys({ type }: {
        type: NodeType;
    }): {
        "Ctrl->": (state: EditorState<any>, dispatch?: Dispatch | undefined) => boolean;
        "Mod-]": (state: EditorState<any>, dispatch?: Dispatch | undefined) => boolean;
        "Shift-Enter": (state: EditorState, dispatch: Dispatch) => boolean;
    };
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
    };
}
//# sourceMappingURL=Blockquote.d.ts.map