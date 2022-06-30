import { Schema, NodeType, NodeSpec, Node as ProsemirrorModel } from "prosemirror-model";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import Node from "./Node";
export default class BulletList extends Node {
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
        "Shift-Ctrl-8": (state: import("prosemirror-state").EditorState<any>, dispatch: (tr: import("prosemirror-state").Transaction<any>) => void) => boolean;
    };
    inputRules({ type }: {
        type: NodeType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorModel): void;
    parseMarkdown(): {
        block: string;
    };
}
//# sourceMappingURL=BulletList.d.ts.map