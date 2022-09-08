"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const y_prosemirror_1 = require("y-prosemirror");
const Extension_1 = __importDefault(require("../lib/Extension"));
class History extends Extension_1.default {
    get name() {
        return "history";
    }
    keys() {
        return {
            "Mod-z": y_prosemirror_1.undo,
            "Mod-y": y_prosemirror_1.redo,
            "Shift-Mod-z": y_prosemirror_1.redo,
            Backspace: prosemirror_inputrules_1.undoInputRule,
        };
    }
    get plugins() {
        return [y_prosemirror_1.yUndoPlugin()];
    }
}
exports.default = History;
//# sourceMappingURL=History.js.map