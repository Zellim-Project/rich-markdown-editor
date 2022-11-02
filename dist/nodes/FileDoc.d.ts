/// <reference types="react" />
import { Plugin } from "prosemirror-state";
import Node from "./Node";
import filesRule from "../rules/files";
export default class File extends Node {
    get name(): string;
    get rulePlugins(): (typeof filesRule)[];
    get schema(): {
        attrs: {
            key: {
                default: string;
            };
            fileName: {
                default: string;
            };
            size: {
                default: string;
            };
            type: {
                default: string;
            };
            mimeType: {
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
                fileName: string | null;
                key: string | null;
                size: string | null;
                type: string | null;
                mimeType: string | null;
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
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (token: any) => {
            key: string | null;
            size: string | null;
            type: string | null;
            mimeType: string | null;
            fileName: string | null;
        };
    };
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=FileDoc.d.ts.map