import { MarkSpec, MarkType } from "prosemirror-model";
import Mark from "./Mark";
export default class Highlight extends Mark {
    get name(): string;
    get schema(): MarkSpec;
    inputRules({ type }: {
        type: MarkType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    keys({ type }: {
        type: MarkType;
    }): {
        "Mod-Ctrl-h": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
    };
    get rulePlugins(): ((md: import("markdown-it/lib")) => void)[];
    toMarkdown(): {
        open: string;
        close: string;
        mixable: boolean;
        expelEnclosingWhitespace: boolean;
    };
    parseMarkdown(): {
        mark: string;
    };
}
//# sourceMappingURL=Highlight.d.ts.map