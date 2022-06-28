import { Node as ProsemirrorNode } from "prosemirror-model";
import { EditorView, Decoration } from "prosemirror-view";
import * as React from "react";
import Extension from "../lib/Extension";
import { ComponentProps } from "../types";
import Editor from "../";
declare type Component = (props: ComponentProps) => React.ReactElement;
export default class ComponentView {
    component: Component;
    editor: Editor;
    extension: Extension;
    node: ProsemirrorNode;
    view: EditorView;
    getPos: () => number;
    decorations: Decoration<{
        [key: string]: any;
    }>[];
    isSelected: boolean;
    dom: HTMLElement | null;
    constructor(component: Component, { editor, extension, node, view, getPos, decorations, }: {
        editor: Editor;
        extension: Extension;
        node: ProsemirrorNode;
        view: EditorView;
        getPos: () => number;
        decorations: Decoration<{
            [key: string]: any;
        }>[];
    });
    renderElement: () => void;
    update(node: ProsemirrorNode): boolean;
    selectNode(): void;
    deselectNode(): void;
    stopEvent(event: Event): boolean;
    destroy(): void;
    ignoreMutation(): boolean;
}
export {};
//# sourceMappingURL=ComponentView.d.ts.map