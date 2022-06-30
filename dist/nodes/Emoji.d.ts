import Token from "markdown-it/lib/token";
import { InputRule } from "prosemirror-inputrules";
import { NodeSpec, Node as ProsemirrorNode, NodeType } from "prosemirror-model";
import { EditorState, Plugin } from "prosemirror-state";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import emojiRule from "../rules/emoji";
import { Dispatch } from "../types";
import Node from "./Node";
export default class Emoji extends Node {
    get name(): string;
    get schema(): NodeSpec;
    get rulePlugins(): (typeof emojiRule)[];
    get plugins(): Plugin<any, any>[];
    commands({ type }: {
        type: NodeType;
    }): (attrs: Record<string, string>) => (state: EditorState, dispatch: Dispatch) => boolean;
    inputRules({ type }: {
        type: NodeType;
    }): InputRule[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        node: string;
        getAttrs: (tok: Token) => {
            "data-name": string;
        };
    };
}
//# sourceMappingURL=Emoji.d.ts.map