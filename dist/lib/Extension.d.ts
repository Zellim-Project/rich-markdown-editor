import { PluginSimple } from "markdown-it";
import { InputRule } from "prosemirror-inputrules";
import { NodeType, MarkType, Schema } from "prosemirror-model";
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import Editor from "../";
import { Dispatch } from "../types";
export declare type Command = (state: EditorState, dispatch: Dispatch) => boolean;
export declare type CommandFactory = (attrs?: Record<string, any>) => (state: EditorState, dispatch: Dispatch, view: EditorView) => boolean;
export default class Extension {
    options: any;
    editor: Editor;
    constructor(options?: Record<string, any>);
    bindEditor(editor: Editor): void;
    get type(): string;
    get name(): string;
    get plugins(): Plugin[];
    get rulePlugins(): PluginSimple[];
    get defaultOptions(): {};
    keys(_options: {
        type?: NodeType | MarkType;
        schema: Schema;
    }): Record<string, Command>;
    inputRules(_options: {
        type?: NodeType | MarkType;
        schema: Schema;
    }): InputRule[];
    commands(_options: {
        type?: NodeType | MarkType;
        schema: Schema;
    }): Record<string, CommandFactory> | CommandFactory;
}
//# sourceMappingURL=Extension.d.ts.map