"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const y_prosemirror_1 = require("y-prosemirror");
const Extension_1 = __importDefault(require("../lib/Extension"));
const prosemirror_keymap_1 = require("prosemirror-keymap");
class Sync extends Extension_1.default {
    get name() {
        return "sync";
    }
    get plugins() {
        return [
            y_prosemirror_1.ySyncPlugin(this.options.yXmlFragment),
            y_prosemirror_1.yCursorPlugin(this.options.yProvider.awareness),
            y_prosemirror_1.yUndoPlugin(),
            prosemirror_keymap_1.keymap({
                "Mod-z": y_prosemirror_1.undo,
                "Mod-y": y_prosemirror_1.redo,
                "Mod-Shift-z": y_prosemirror_1.redo,
            }),
        ];
    }
}
exports.default = Sync;
//# sourceMappingURL=Sync.js.map