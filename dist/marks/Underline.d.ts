import { MarkSpec, MarkType } from "prosemirror-model";
import underlinesRule from "../rules/underlines";
import Mark from "./Mark";
export default class Underline extends Mark {
    get name(): string;
    get schema(): MarkSpec;
    get rulePlugins(): (typeof underlinesRule)[];
    inputRules({ type }: {
        type: MarkType;
    }): import("prosemirror-inputrules").InputRule<any>[];
    keys({ type }: {
        type: MarkType;
    }): {
        "Mod-u": (state: import("prosemirror-state").EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
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
//# sourceMappingURL=Underline.d.ts.map