/// <reference types="react" />
import { Plugin } from "prosemirror-state";
import Node from "./Node";
import linkDocumentRules from "../rules/linkDocument";
export default class EmbedTask extends Node {
    get name(): string;
    get schema(): {
        attrs: {
            docId: {
                default: string;
            };
            docName: {
                default: string;
            };
            icon: {
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
                docName: string | null;
                docId: string | null;
                icon: string | null;
            };
        }[];
        toDOM: (node: any) => (string | any[] | {
            class: string;
        })[];
    };
    component: (props: any) => JSX.Element;
    commands({ type }: {
        type: any;
    }): (attrs: any) => (state: any, dispatch: any) => boolean;
    get rulePlugins(): (typeof linkDocumentRules)[];
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (token: any) => {
            docId: string | null;
            docName: string | null;
            icon: string | null;
        };
    };
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=linkDocument.d.ts.map