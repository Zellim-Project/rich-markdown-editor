import isMarkActive from "./isMarkActive";
export default function isInCode(state) {
    if (state.schema.nodes.code_block) {
        const $head = state.selection.$head;
        for (let d = $head.depth; d > 0; d--) {
            if ($head.node(d).type === state.schema.nodes.code_block) {
                return true;
            }
        }
    }
    return isMarkActive(state.schema.marks.code_inline)(state);
}
//# sourceMappingURL=isInCode.js.map