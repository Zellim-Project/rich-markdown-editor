import Token from "markdown-it/lib/token";
import { NodeSpec, NodeType, Schema, Node as ProsemirrorNode } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import { Dispatch } from "../types";
import Node from "./Node";
import baseDictionary from "../dictionary";
export default class CodeFence extends Node {
    constructor(options: {
        dictionary: typeof baseDictionary;
        onShowToast: (message: string) => void;
    });
    get languageOptions(): [string, string][];
    get name(): string;
    get schema(): NodeSpec;
    commands({ type, schema }: {
        type: NodeType;
        schema: Schema;
    }): (attrs: Record<string, any>) => (state: EditorState<any>, dispatch?: Dispatch | undefined) => boolean;
    keys({ type, schema }: {
        type: NodeType;
        schema: Schema;
    }): {
        "Shift-Ctrl-\\": (state: EditorState<any>, dispatch?: Dispatch | undefined) => boolean;
        "Shift-Enter": (state: EditorState, dispatch: Dispatch) => boolean;
        Tab: (state: EditorState, dispatch: Dispatch) => boolean;
    };
    handleCopyToClipboard: (event: MouseEvent) => void;
    handleLanguageChange: (event: InputEvent) => void;
    get plugins(): import("prosemirror-state").Plugin<any, any>[];
    inputRules({ type }: {
        type: NodeType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    get markdownToken(): string;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: Token) => {
            language: string;
        };
    };
}
//# sourceMappingURL=CodeFence.d.ts.map