import { Node as ProsemirrorNode, NodeSpec } from "prosemirror-model";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import Node from "./Node";
export default class Text extends Node {
    get name(): string;
    get schema(): NodeSpec;
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
}
//# sourceMappingURL=Text.d.ts.map