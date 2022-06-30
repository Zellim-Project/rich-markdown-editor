"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_utils_1 = require("prosemirror-utils");
const isNodeActive = (type, attrs = {}) => (state) => {
    if (!type) {
        return false;
    }
    const node = (0, prosemirror_utils_1.findSelectedNodeOfType)(type)(state.selection) ||
        (0, prosemirror_utils_1.findParentNode)(node => node.type === type)(state.selection);
    if (!Object.keys(attrs).length || !node) {
        return !!node;
    }
    return node.node.hasMarkup(type, { ...node.node.attrs, ...attrs });
};
exports.default = isNodeActive;
//# sourceMappingURL=isNodeActive.js.map