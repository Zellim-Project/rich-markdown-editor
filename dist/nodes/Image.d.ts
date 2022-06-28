import Token from "markdown-it/lib/token";
import { InputRule } from "prosemirror-inputrules";
import { Node as ProsemirrorNode, NodeSpec, NodeType } from "prosemirror-model";
import { Plugin, EditorState } from "prosemirror-state";
import * as React from "react";
import { Options } from "../commands/insertFiles";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import { ComponentProps, Dispatch } from "../types";
import Node from "./Node";
export default class Image extends Node {
    options: Options;
    get name(): string;
    get schema(): NodeSpec;
    handleKeyDown: ({ node, getPos, }: {
        node: ProsemirrorNode;
        getPos: () => number;
    }) => (event: React.KeyboardEvent<HTMLSpanElement>) => void;
    handleBlur: ({ node, getPos, }: {
        node: ProsemirrorNode;
        getPos: () => number;
    }) => (event: React.FocusEvent<HTMLSpanElement>) => void;
    handleSelect: ({ getPos }: {
        getPos: () => number;
    }) => (event: React.MouseEvent) => void;
    handleDownload: ({ node }: {
        node: ProsemirrorNode;
    }) => (event: React.MouseEvent) => void;
    handleMouseDown: (ev: React.MouseEvent<HTMLParagraphElement>) => void;
    component: (props: ComponentProps) => JSX.Element;
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        node: string;
        getAttrs: (token: Token) => {
            layoutClass?: undefined;
            title?: undefined;
            src: string | null;
            alt: string | null;
        } | {
            layoutClass: string;
            title?: undefined;
            src: string | null;
            alt: string | null;
        } | {
            title: string;
            layoutClass?: undefined;
            src: string | null;
            alt: string | null;
        };
    };
    commands({ type }: {
        type: NodeType;
    }): {
        downloadImage: () => (state: EditorState) => boolean;
        deleteImage: () => (state: EditorState, dispatch: Dispatch) => boolean;
        alignRight: () => (state: EditorState, dispatch: Dispatch) => boolean;
        alignLeft: () => (state: EditorState, dispatch: Dispatch) => boolean;
        replaceImage: () => (state: EditorState) => boolean;
        alignCenter: () => (state: EditorState, dispatch: Dispatch) => boolean;
        createImage: (attrs: Record<string, any>) => (state: EditorState, dispatch: Dispatch) => boolean;
    };
    inputRules({ type }: {
        type: NodeType;
    }): InputRule<any>[];
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=Image.d.ts.map