/// <reference types="react" />
import { Plugin } from "prosemirror-state";
import Node from "./Node";
import taskRules from "../rules/embedTask";
export default class EmbedTask extends Node {
    get name(): string;
    get schema(): {
        attrs: {
            taskId: {
                default: string;
            };
            projectId: {
                default: string;
            };
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
                taskId: string | null;
                projectId: string | null;
                projectName: string | null;
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
    get rulePlugins(): (typeof taskRules)[];
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule[];
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (token: any) => {
            projectName: string | null;
            taskName: string | null;
            taskId: string | null;
            projectId: string | null;
        };
    };
    get plugins(): Plugin<any>[];
}
//# sourceMappingURL=embedTask.d.ts.map