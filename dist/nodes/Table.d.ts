import { NodeSpec, Node as ProsemirrorNode, Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { addColumnAfter, addColumnBefore, deleteColumn, deleteRow, deleteTable, toggleHeaderCell, toggleHeaderColumn, toggleHeaderRow } from "prosemirror-tables";
import { MarkdownSerializerState } from "../lib/markdown/serializer";
import tablesRule from "../rules/tables";
import { Dispatch } from "../types";
import Node from "./Node";
export default class Table extends Node {
    get name(): string;
    get schema(): NodeSpec;
    get rulePlugins(): (typeof tablesRule)[];
    commands({ schema }: {
        schema: Schema;
    }): {
        createTable: ({ rowsCount, colsCount, }: {
            rowsCount: number;
            colsCount: number;
        }) => (state: EditorState, dispatch: Dispatch) => boolean;
        setColumnAttr: ({ index, alignment, }: {
            index: number;
            alignment: string;
        }) => (state: EditorState, dispatch: Dispatch) => boolean;
        addColumnBefore: () => typeof addColumnBefore;
        addColumnAfter: () => typeof addColumnAfter;
        deleteColumn: () => typeof deleteColumn;
        addRowAfter: ({ index }: {
            index: number;
        }) => (state: EditorState, dispatch: Dispatch) => boolean;
        deleteRow: () => typeof deleteRow;
        deleteTable: () => typeof deleteTable;
        toggleHeaderColumn: () => typeof toggleHeaderColumn;
        toggleHeaderRow: () => typeof toggleHeaderRow;
        toggleHeaderCell: () => typeof toggleHeaderCell;
    };
    keys(): {
        Tab: (state: EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        "Shift-Tab": (state: EditorState<any>, dispatch?: ((tr: import("prosemirror-state").Transaction<any>) => void) | undefined) => boolean;
        Enter: (state: EditorState, dispatch: Dispatch) => boolean;
    };
    toMarkdown(state: MarkdownSerializerState, node: ProsemirrorNode): void;
    parseMarkdown(): {
        block: string;
    };
    get plugins(): any;
}
//# sourceMappingURL=Table.d.ts.map