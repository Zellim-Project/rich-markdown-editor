/// <reference types="react" />
import Token from "markdown-it/lib/token";
import { NodeSpec, NodeType, Node as ProsemirrorNode } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import { ComponentProps, Dispatch } from "../types";
import Node from "./Node";
export default class Embed extends Node {
    get name(): string;
    get schema(): NodeSpec;
    get rulePlugins(): ((md: import("markdown-it/lib")) => void)[];
    component({ isEditable, isSelected, theme, node }: ComponentProps): JSX.Element | null;
    commands({ type }: {
        type: NodeType;
    }): (attrs: Record<string, any>) => (state: EditorState, dispatch: Dispatch) => boolean;
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        node: string;
        getAttrs: (token: Token) => {
            href: string | null;
        };
    };
}
//# sourceMappingURL=Embed.d.ts.map