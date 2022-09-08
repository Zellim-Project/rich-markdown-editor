"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_dom_1 = __importDefault(require("react-dom"));
const y_prosemirror_1 = require("y-prosemirror");
const EditorCursor_1 = __importDefault(require("../components/EditorCursor"));
const Extension_1 = __importDefault(require("../lib/Extension"));
function cursorBuilder(userInfo) {
    const cursor = document.createElement("span");
    const editorCursor = EditorCursor_1.default({
        userName: userInfo.name,
        userColor: userInfo.color,
    });
    react_dom_1.default.render(editorCursor, cursor);
    return cursor;
}
const selectionBuilder = (user) => {
    return {
        style: `background-color: ${user.color}70`,
        class: "ProseMirror-yjs-selection",
    };
};
class Sync extends Extension_1.default {
    get name() {
        return "sync";
    }
    get plugins() {
        return [
            y_prosemirror_1.ySyncPlugin(this.options.yXmlFragment),
            y_prosemirror_1.yCursorPlugin(this.options.yProvider.awareness, {
                cursorBuilder,
                getSelection: (state) => state.selection,
                selectionBuilder,
            }, "cursor"),
        ];
    }
}
exports.default = Sync;
//# sourceMappingURL=Sync.js.map