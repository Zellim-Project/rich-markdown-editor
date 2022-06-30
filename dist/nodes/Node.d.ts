import { InputRule } from "prosemirror-inputrules";
import { Node as ProsemirrorNode, NodeSpec, NodeType, Schema } from "prosemirror-model";
import Extension, { Command, CommandFactory } from "../lib/Extension";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
export default abstract class Node extends Extension {
    get type(): string;
    get schema(): NodeSpec;
    get markdownToken(): string;
    inputRules(_options: {
        type: NodeType;
        schema: Schema;
    }): InputRule[];
    keys(_options: {
        type: NodeType;
        schema: Schema;
    }): Record<string, Command>;
    commands(_options: {
        type: NodeType;
        schema: Schema;
    }): Record<string, CommandFactory> | CommandFactory;
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): any | void;
}
//# sourceMappingURL=Node.d.ts.map