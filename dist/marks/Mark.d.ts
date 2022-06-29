import { InputRule } from "prosemirror-inputrules";
import { TokenConfig } from "prosemirror-markdown";
import { MarkSpec, MarkType, Node as ProsemirrorNode, Schema } from "prosemirror-model";
import Extension, { Command, CommandFactory } from "../lib/Extension";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
export default abstract class Mark extends Extension {
    get type(): string;
    get schema(): MarkSpec;
    get markdownToken(): string;
    keys(_options: {
        type: MarkType;
        schema: Schema;
    }): Record<string, Command>;
    inputRules(_options: {
        type: MarkType;
        schema: Schema;
    }): InputRule[];
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): TokenConfig | void;
    commands({ type }: {
        type: MarkType;
        schema: Schema;
    }): CommandFactory;
}
//# sourceMappingURL=Mark.d.ts.map