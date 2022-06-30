import { PluginSimple } from "markdown-it";
import { MarkdownParser } from "prosemirror-markdown";
import { Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import Editor from "../../src/";
import Mark from "../marks/Mark";
import Node from "../nodes/Node";
import Extension from "./Extension";
import { MarkdownSerializer } from "./markdown/serializer";
export default class ExtensionManager {
    extensions: (Node | Mark | Extension)[];
    constructor(extensions?: (Extension | typeof Node | typeof Mark | typeof Extension)[], editor?: Editor);
    get nodes(): {};
    serializer(): MarkdownSerializer;
    parser({ schema, rules, plugins, }: {
        schema: Schema;
        rules?: Record<string, any>;
        plugins?: PluginSimple[];
    }): MarkdownParser;
    get marks(): {};
    get plugins(): import("prosemirror-state").Plugin<any, any>[];
    get rulePlugins(): PluginSimple[];
    keymaps({ schema }: {
        schema: Schema;
    }): import("prosemirror-state").Plugin<any, any>[];
    inputRules({ schema }: {
        schema: Schema;
    }): import("prosemirror-inputrules").InputRule<any>[];
    commands({ schema, view }: {
        schema: Schema;
        view: EditorView;
    }): {};
}
//# sourceMappingURL=ExtensionManager.d.ts.map