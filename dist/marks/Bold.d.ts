import { InputRule } from "prosemirror-inputrules";
import { MarkSpec, MarkType } from "prosemirror-model";
import Mark from "./Mark";
export default class Bold extends Mark {
    get name(): string;
    get schema(): MarkSpec;
    inputRules({ type }: {
        type: MarkType;
    }): InputRule[];
    keys({ type }: {
        type: MarkType;
    }): {
        "Mod-b": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        "Mod-B": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
    };
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
//# sourceMappingURL=Bold.d.ts.map