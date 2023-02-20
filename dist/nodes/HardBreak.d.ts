import Node from "./Node";
import breakRule from "../rules/breaks";
export default class HardBreak extends Node {
    get name(): string;
    get schema(): {
        inline: boolean;
        group: string;
        selectable: boolean;
        parseDOM: {
            tag: string;
        }[];
        toDOM(): string[];
    };
    get rulePlugins(): (typeof breakRule)[];
    commands({ type }: {
        type: any;
    }): () => (state: any, dispatch: any) => boolean;
    keys({ type }: {
        type: any;
    }): {
        "Shift-Enter": <S extends import("prosemirror-model").Schema<any, any> = any>(state: import("prosemirror-state").EditorState<S>, dispatch?: ((tr: import("prosemirror-state").Transaction<S>) => void) | undefined, view?: import("prosemirror-view").EditorView<S> | undefined) => boolean;
    };
    toMarkdown(state: any): void;
    parseMarkdown(): {
        node: string;
    };
}
//# sourceMappingURL=HardBreak.d.ts.map