import { InputRule } from "prosemirror-inputrules";
import { MarkSpec, MarkType } from "prosemirror-model";
import { Command } from "../lib/Extension";
import Mark from "./Mark";
export default class Italic extends Mark {
    get name(): string;
    get schema(): MarkSpec;
    inputRules({ type }: {
        type: MarkType;
    }): InputRule[];
    keys({ type }: {
        type: MarkType;
    }): Record<string, Command>;
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
//# sourceMappingURL=Italic.d.ts.map