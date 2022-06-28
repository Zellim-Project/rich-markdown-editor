import { Node as ProsemirrorNode, NodeSpec, NodeType, Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import Node from "./Node";
export default class Heading extends Node {
    className: string;
    get name(): string;
    get defaultOptions(): {
        levels: number[];
        collapsed: undefined;
    };
    get schema(): NodeSpec;
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (token: Record<string, any>) => {
            level: number;
        };
    };
    commands({ type, schema }: {
        type: NodeType;
        schema: Schema;
    }): (attrs: Record<string, any>) => (state: import("prosemirror-state").EditorState<any>, dispatch?: import("../types").Dispatch | undefined) => boolean;
    handleFoldContent: (event: MouseEvent) => void;
    handleCopyLink: (event: MouseEvent) => void;
    keys({ type, schema }: {
        type: NodeType;
        schema: Schema;
    }): any;
    get plugins(): Plugin<any, any>[];
    inputRules({ type }: {
        type: NodeType;
    }): any;
}
//# sourceMappingURL=Heading.d.ts.map