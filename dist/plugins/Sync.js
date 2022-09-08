import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo, } from "y-prosemirror";
import Extension from "../lib/Extension";
import { keymap } from "prosemirror-keymap";
export default class Sync extends Extension {
    get name() {
        return "sync";
    }
    get plugins() {
        return [
            ySyncPlugin(this.options.yXmlFragment),
            yCursorPlugin(this.options.yProvider.awareness),
            yUndoPlugin(),
            keymap({
                "Mod-z": undo,
                "Mod-y": redo,
                "Mod-Shift-z": redo,
            }),
        ];
    }
}
//# sourceMappingURL=Sync.js.map