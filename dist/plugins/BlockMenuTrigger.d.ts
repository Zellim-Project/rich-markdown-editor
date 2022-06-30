import { InputRule } from "prosemirror-inputrules";
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import Extension from "../lib/Extension";
export declare function run(view: EditorView, from: number, to: number, regex: RegExp, handler: (state: EditorState, match: RegExpExecArray | null, from?: number, to?: number) => boolean | null): boolean;
export default class BlockMenuTrigger extends Extension {
    get name(): string;
    get plugins(): Plugin<any, any>[];
    inputRules(): InputRule<any>[];
}
//# sourceMappingURL=BlockMenuTrigger.d.ts.map