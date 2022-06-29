import Token from "markdown-it/lib/token";
import { NodeSpec, NodeType, Schema, Node as ProsemirrorNode } from "prosemirror-model";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import Node from "./Node";
export default class OrderedList extends Node {
    get name(): string;
    get schema(): NodeSpec;
    commands({ type, schema }: {
        type: NodeType;
        schema: Schema;
    }): () => (state: import("prosemirror-state").EditorState<any>, dispatch: (tr: import("prosemirror-state").Transaction<any>) => void) => boolean;
    keys({ type, schema }: {
        type: NodeType;
        schema: Schema;
    }): {
        "Shift-Ctrl-9": (state: import("prosemirror-state").EditorState<any>, dispatch: (tr: import("prosemirror-state").Transaction<any>) => void) => boolean;
    };
    inputRules({ type }: {
        type: NodeType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: Token) => {
            order: number;
        };
    };
}
//# sourceMappingURL=OrderedList.d.ts.map