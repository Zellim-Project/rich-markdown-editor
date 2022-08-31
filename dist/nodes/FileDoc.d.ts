/// <reference types="react" />
import { Plugin } from "prosemirror-state";
import Node from "./Node";
import filesRule from "../rules/files";
export default class File extends Node {
    get name(): string;
    get rulePlugins(): (typeof filesRule)[];
    get schema(): {
        attrs: {
            src: {};
            alt: {
                default: string;
            };
            size: {
                default: string;
            };
            type: {
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
                alt: string | null;
                src: string;
                size: string | null;
                type: string | null;
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
            src: string | null;
            size: string | null;
            type: string | null;
            alt: string | null;
        };
    };
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=FileDoc.d.ts.map