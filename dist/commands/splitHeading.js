import { TextSelection } from "prosemirror-state";
import { findBlockNodes } from "prosemirror-utils";
import findCollapsedNodes from "../queries/findCollapsedNodes";
export default function splitHeading(type) {
    return (state, dispatch) => {
        const { $from, from, $to, to } = state.selection;
        if ($from.parent.type !== type) {
            return false;
        }
        const startPos = $from.before() + 1;
        if (startPos === from) {
            const collapsedNodes = findCollapsedNodes(state.doc);
            const allBlocks = findBlockNodes(state.doc);
            const previousBlock = allBlocks
                .filter(a => a.pos + a.node.nodeSize < startPos)
                .pop();
            const previousBlockIsCollapsed = !!collapsedNodes.find(a => a.pos === previousBlock?.pos);
            if (previousBlockIsCollapsed) {
                const transaction = state.tr.insert($from.before(), type.create({ ...$from.parent.attrs, collapsed: false }));
                dispatch(transaction
                    .setSelection(TextSelection.near(transaction.doc.resolve($from.before())))
                    .scrollIntoView());
                return true;
            }
            return false;
        }
        if (!$from.parent.attrs.collapsed) {
            return false;
        }
        const endPos = $to.after() - 1;
        if (endPos === to) {
            const collapsedNodes = findCollapsedNodes(state.doc);
            const allBlocks = findBlockNodes(state.doc);
            const visibleBlocks = allBlocks.filter(a => !collapsedNodes.find(b => b.pos === a.pos));
            const nextVisibleBlock = visibleBlocks.find(a => a.pos > from);
            const pos = nextVisibleBlock
                ? nextVisibleBlock.pos
                : state.doc.content.size;
            const transaction = state.tr.insert(pos, type.create({ ...$from.parent.attrs, collapsed: false }));
            dispatch(transaction
                .setSelection(TextSelection.near(transaction.doc.resolve(Math.min(pos + 1, transaction.doc.content.size))))
                .scrollIntoView());
            return true;
        }
        return false;
    };
}
//# sourceMappingURL=splitHeading.js.map