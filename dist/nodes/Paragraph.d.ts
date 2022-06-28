import { NodeSpec, NodeType, Node as ProsemirrorNode } from "prosemirror-model";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import Node from "./Node";
export default class Paragraph extends Node {
    get name(): string;
    get schema(): NodeSpec;
    keys({ type }: {
        type: NodeType;
    }): {
        "Shift-Ctrl-0": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
    };
    commands({ type }: {
        type: NodeType;
    }): () => (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
    };
}
//# sourceMappingURL=Paragraph.d.ts.map