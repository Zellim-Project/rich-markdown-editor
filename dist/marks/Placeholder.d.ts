import { MarkSpec } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import Mark from "./Mark";
export default class Placeholder extends Mark {
    get name(): string;
    get schema(): MarkSpec;
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
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=Placeholder.d.ts.map