/// <reference types="react" />
import { Plugin } from "prosemirror-state";
import Node from "./Node";
import imageRules from "../rules/embedImage";
export default class Image extends Node {
    get name(): string;
    get schema(): {
        attrs: {
            src: {};
            alt: {
                default: null;
            };
            layoutClass: {
                default: null;
            };
            title: {
                default: null;
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
                src: string | null;
                alt: string | null;
                title: string | null;
                layoutClass: string | null;
            };
        }[];
        toDOM: (node: any) => (string | any[] | {
            class: string;
        })[];
    };
    handleKeyDown: ({ node, getPos }: {
        node: any;
        getPos: any;
    }) => (event: any) => void;
    handleBlur: ({ node, getPos }: {
        node: any;
        getPos: any;
    }) => (event: any) => void;
    handleSelect: ({ getPos }: {
        getPos: any;
    }) => (event: any) => void;
    handleDownload: ({ node }: {
        node: any;
    }) => (event: any) => void;
    component: (props: any) => JSX.Element;
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        node: string;
        getAttrs: (token: any) => {
            layoutClass?: undefined;
            title?: undefined;
            src: string;
            alt: string | undefined;
        } | {
            layoutClass: any;
            title?: undefined;
            src: string;
            alt: string | undefined;
        } | {
            title: any;
            layoutClass?: undefined;
            src: string;
            alt: string | undefined;
        };
    };
    commands({ type }: {
        type: any;
    }): {
        container_image: (attrs: any) => (state: any, dispatch: any) => boolean;
        downloadImage: () => (state: any) => Promise<boolean>;
        deleteImage: () => (state: any, dispatch: any) => boolean;
        alignRight: () => (state: any, dispatch: any) => boolean;
        alignLeft: () => (state: any, dispatch: any) => boolean;
        replaceImage: () => (state: any) => void;
        alignCenter: () => (state: any, dispatch: any) => boolean;
        createImage: (attrs: any) => (state: any, dispatch: any) => boolean;
    };
    get rulePlugins(): (typeof imageRules)[];
    inputRules({ type }: {
        type: any;
    }): import("prosemirror-inputrules").InputRule[];
    get plugins(): Plugin<any>[];
}
//# sourceMappingURL=Image.d.ts.map