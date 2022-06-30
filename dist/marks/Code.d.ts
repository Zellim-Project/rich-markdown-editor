import { MarkSpec, MarkType, Node as ProsemirrorNode, Mark as ProsemirrorMark } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import Mark from "./Mark";
export default class Code extends Mark {
    get name(): string;
    get schema(): MarkSpec;
    inputRules({ type }: {
        type: MarkType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    keys({ type }: {
        type: MarkType;
    }): {
        "Mod`": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        ArrowLeft: (state: import("prosemirror-state").EditorState<any>, dispatch: (tr: import("prosemirror-state").Transaction<any>) => void) => boolean;
        ArrowRight: (state: import("prosemirror-state").EditorState<any>, dispatch: (tr: import("prosemirror-state").Transaction<any>) => void) => boolean;
    };
    get plugins(): Plugin<any, any>[];
    toMarkdown(): {
        open(_state: MarkdownSerializerState, _mark: ProsemirrorMark, parent: ProsemirrorNode, index: number): string;
        close(_state: MarkdownSerializerState, _mark: ProsemirrorMark, parent: ProsemirrorNode, index: number): string;
        escape: boolean;
    };
    parseMarkdown(): {
        mark: string;
    };
}
//# sourceMappingURL=Code.d.ts.map