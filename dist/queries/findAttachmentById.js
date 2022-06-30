"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findAttachmentById = function (state, id) {
    let result = null;
    state.doc.descendants((node, pos) => {
        if (result) {
            return false;
        }
        if (node.type.name === "attachment" && node.attrs.id === id) {
            result = [pos, pos + node.nodeSize];
            return false;
        }
        return true;
    });
    return result;
};
exports.default = findAttachmentById;
//# sourceMappingURL=findAttachmentById.js.map