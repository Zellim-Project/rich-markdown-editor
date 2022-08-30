/// <reference types="react" />
import { Plugin } from "prosemirror-state";
import Node from "./Node";
import projectRules from "../rules/embedProject";
export default class EmbedProject extends Node {
    get name(): string;
    get schema(): {
        attrs: {
            projectImg: {
                default: string;
            };
            projectName: {
                default: string;
            };
            projectId: {
                default: string;
            };
            projectColor: {
                default: string;
            };
            members: {
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
                projectName: string | null;
                projectId: string | null;
                members: string | null;
                projectImg: string;
                projectColor: any;
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
    get rulePlugins(): (typeof projectRules)[];
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule<any>[];
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (token: any) => {
            projectName: string | null;
            members: string | null;
            projectImg: string | null;
            projectId: string | null;
            projectColor: string | null;
        };
    };
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=embedProject.d.ts.map