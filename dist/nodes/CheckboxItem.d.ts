import Token from "markdown-it/lib/token";
import { NodeSpec, Node as ProsemirrorNode, NodeType } from "prosemirror-model";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import checkboxRule from "../rules/checkboxes";
import Node from "./Node";
export default class CheckboxItem extends Node {
    get name(): string;
    get schema(): NodeSpec;
    get rulePlugins(): (typeof checkboxRule)[];
    handleClick: (event: Event) => void;
    keys({ type }: {
        type: NodeType;
    }): {
        Enter: (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        Tab: (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        "Shift-Tab": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        "Mod-]": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        "Mod-[": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
    };
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: Token) => {
            checked: boolean | undefined;
        };
    };
}
//# sourceMappingURL=CheckboxItem.d.ts.map