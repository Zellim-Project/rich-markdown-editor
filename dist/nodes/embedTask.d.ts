import { InputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import Node from "./Node";
export default class EmbedTask extends Node {
    get name(): string;
    get schema(): {
        attrs: {
            taskName: {
                default: string;
            };
            projectName: {
                default: string;
            };
        };
        content: string;
        group: string;
        defining: boolean;
        draggable: boolean;
        parseDOM: {
            tag: string;
            preserveWhitespace: string;
            contentElement: string;
            getAttrs: (dom: HTMLDivElement) => {
                taskName: string | null;
                projectName: string | null;
            };
        }[];
        toDOM: (node: any) => (string | HTMLDivElement | {
            class: string;
        })[];
    };
    commands({ type }: {
        type: any;
    }): (attrs: any) => (state: any, dispatch: any) => boolean;
    inputRules({ type }: {
        type: any;
    }): InputRule<any>[];
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (token: any) => {
            projectName: string | null;
            taskName: string | null;
        };
    };
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=embedTask.d.ts.map