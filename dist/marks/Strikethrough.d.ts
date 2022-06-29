import { MarkSpec, MarkType } from "prosemirror-model";
import Mark from "./Mark";
export default class Strikethrough extends Mark {
    get name(): string;
    get schema(): MarkSpec;
    keys({ type }: {
        type: MarkType;
    }): {
        "Mod-d": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
    };
    inputRules({ type }: {
        type: MarkType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(): {
        open: string;
        close: string;
        mixable: boolean;
        expelEnclosingWhitespace: boolean;
    };
    get markdownToken(): string;
    parseMarkdown(): {
        mark: string;
    };
}
//# sourceMappingURL=Strikethrough.d.ts.map