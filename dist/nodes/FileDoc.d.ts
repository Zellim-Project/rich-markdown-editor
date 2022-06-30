import Token from "markdown-it/lib/token";
import { NodeType, Node as ProsemirrorNode } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import Node from "./Node";
import filesRule from "../rules/files";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
export default class File extends Node {
    get name(): string;
    get rulePlugins(): (typeof filesRule)[];
    get schema(): any;
    commands({ type }: {
        type: NodeType;
    }): (attrs: any) => (state: import("prosemirror-state").EditorState<any>, dispatch?: import("../types").Dispatch | undefined) => boolean;
    inputRules({ type }: {
        type: NodeType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (token: Token) => {
            src: string | null;
            alt: string | null;
        };
    };
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=FileDoc.d.ts.map