import Token from "markdown-it/lib/token";
import { InputRule } from "prosemirror-inputrules";
import { MarkdownSerializerState } from "prosemirror-markdown";
import { MarkSpec, MarkType, Node, Mark as ProsemirrorMark } from "prosemirror-model";
import { EditorState, Plugin } from "prosemirror-state";
import { Dispatch } from "../types";
import Mark from "./Mark";
export default class Link extends Mark {
    get name(): string;
    get schema(): MarkSpec;
    inputRules({ type }: {
        type: MarkType;
    }): InputRule<any>[];
    commands({ type }: {
        type: MarkType;
    }): ({ href }?: {
        href: string;
    }) => (state: EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
    keys({ type }: {
        type: MarkType;
    }): {
        "Mod-k": (state: EditorState, dispatch: Dispatch) => boolean;
    };
    get plugins(): Plugin<any, any>[];
    toMarkdown(): {
        open(_state: MarkdownSerializerState, mark: ProsemirrorMark, parent: Node, index: number): "[" | "<";
        close(state: MarkdownSerializerState, mark: ProsemirrorMark, parent: Node, index: number): string;
    };
    parseMarkdown(): {
        mark: string;
        getAttrs: (tok: Token) => {
            href: string | null;
            title: string | null;
        };
    };
}
//# sourceMappingURL=Link.d.ts.map