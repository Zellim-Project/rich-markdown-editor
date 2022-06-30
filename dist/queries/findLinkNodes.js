"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_utils_1 = require("prosemirror-utils");
function findLinkNodes(doc) {
    const textNodes = (0, prosemirror_utils_1.findTextNodes)(doc);
    const nodes = [];
    for (const nodeWithPos of textNodes) {
        const hasLinkMark = nodeWithPos.node.marks.find(mark => mark.type.name === "link");
        if (hasLinkMark) {
            nodes.push(nodeWithPos);
        }
    }
    return nodes;
}
exports.default = findLinkNodes;
//# sourceMappingURL=findLinkNodes.js.map