import { NodeSpec } from "prosemirror-model";
import Node from "./Node";
export default class TableRow extends Node {
    get name(): string;
    get schema(): NodeSpec;
    parseMarkdown(): {
        block: string;
    };
}
//# sourceMappingURL=TableRow.d.ts.map