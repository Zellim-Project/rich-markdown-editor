import Token from "markdown-it/lib/token";
import { NodeSpec, Node as ProsemirrorNode, NodeType } from "prosemirror-model";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import noticesRule from "../rules/notices";
import Node from "./Node";
export default class Notice extends Node {
    get styleOptions(): [string, any][];
    get name(): string;
    get rulePlugins(): (typeof noticesRule)[];
    get schema(): NodeSpec;
    commands({ type }: {
        type: NodeType;
    }): (attrs: Record<string, any>) => (state: import("prosemirror-state").EditorState<any>, dispatch?: import("../types").Dispatch | undefined) => boolean;
    handleStyleChange: (event: InputEvent) => void;
    inputRules({ type }: {
        type: NodeType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: Token) => {
            style: string;
        };
    };
}
//# sourceMappingURL=Notice.d.ts.map