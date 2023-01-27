import Node from "./Node";
import { addColumnAfter, addColumnBefore, deleteColumn, deleteRow, deleteTable, fixTables, setCellAttr } from "prosemirror-tables";
import { Plugin } from "prosemirror-state";
import tablesRule from "../rules/tables";
export default class Table extends Node {
    get name(): string;
    get schema(): {
        content: string;
        tableRole: string;
        isolating: boolean;
        group: string;
        parseDOM: {
            tag: string;
        }[];
        toDOM(): (string | {
            class: string;
        } | (string | {
            class: string;
        } | (string | (string | number)[] | {
            class: string;
        })[])[])[];
    };
    get rulePlugins(): (typeof tablesRule)[];
    commands({ schema }: {
        schema: any;
    }): {
        createTable: ({ rowsCount, colsCount }: {
            rowsCount: any;
            colsCount: any;
        }) => (state: any, dispatch: any) => void;
        setColumnAttr: ({ index, alignment }: {
            index: any;
            alignment: any;
        }) => (state: any, dispatch: any) => void;
        addColumnBefore: () => typeof addColumnBefore;
        addColumnAfter: () => typeof addColumnAfter;
        deleteColumn: () => typeof deleteColumn;
        addRowAfter: ({ index }: {
            index: any;
        }) => (state: any, dispatch: any) => void;
        deleteRow: () => typeof deleteRow;
        deleteTable: () => typeof deleteTable;
        toggleHeaderColumn: () => import("prosemirror-state").Command;
        toggleHeaderRow: () => import("prosemirror-state").Command;
        toggleHeaderCell: () => import("prosemirror-state").Command;
        setCellAttr: () => typeof setCellAttr;
        fixTables: () => typeof fixTables;
    };
    keys(): {
        Tab: import("prosemirror-state").Command;
        "Shift-Tab": import("prosemirror-state").Command;
        Enter: (state: any, dispatch: any) => boolean;
    };
    toMarkdown(state: any, node: any): void;
    parseMarkdown(): {
        block: string;
    };
    get plugins(): Plugin<any>[];
}
//# sourceMappingURL=Table.d.ts.map