import Token from "markdown-it/lib/token";
import { InputRule } from "prosemirror-inputrules";
import { NodeSpec, NodeType, Node as ProsemirrorNode } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import { Dispatch } from "../types";
import Node from "./Node";
export default class HorizontalRule extends Node {
    get name(): string;
    get schema(): NodeSpec;
    commands({ type }: {
        type: NodeType;
    }): (attrs: Record<string, any>) => (state: EditorState, dispatch: Dispatch) => boolean;
    keys({ type }: {
        type: NodeType;
    }): {
        "Mod-_": (state: EditorState, dispatch: Dispatch) => boolean;
    };
    inputRules({ type }: {
        type: NodeType;
    }): InputRule<any>[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        node: string;
        getAttrs: (tok: Token) => {
            markup: string;
        };
    };
}
//# sourceMappingURL=HorizontalRule.d.ts.map