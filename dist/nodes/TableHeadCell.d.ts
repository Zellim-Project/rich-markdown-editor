import Token from "markdown-it/lib/token";
import { NodeSpec } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import Node from "./Node";
export default class TableHeadCell extends Node {
    get name(): string;
    get schema(): NodeSpec;
    toMarkdown(): void;
    parseMarkdown(): {
        block: string;
        getAttrs: (tok: Token) => {
            alignment: string;
        };
    };
    get plugins(): Plugin<any, any>[];
}
//# sourceMappingURL=TableHeadCell.d.ts.map