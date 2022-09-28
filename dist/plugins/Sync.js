import ReactDOM from "react-dom";
import { ySyncPlugin, yCursorPlugin } from "y-prosemirror";
import EditorCursor from "../components/EditorCursor";
import Extension from "../lib/Extension";
function cursorBuilder(userInfo) {
    const cursor = document.createElement("span");
    const editorCursor = EditorCursor({
        userName: userInfo.name,
        userColor: userInfo.color
    });
    ReactDOM.render(editorCursor, cursor);
    return cursor;
}
const selectionBuilder = user => {
    console.log(user.color);
    return {
        style: `background-color: ${user.color}bd`,
        class: "ProseMirror-yjs-selection"
    };
};
export default class Sync extends Extension {
    get name() {
        return "sync";
    }
    get plugins() {
        if (this.options.yXmlFragment && this.options.yProvider) {
            return [
                ySyncPlugin(this.options.yXmlFragment),
                yCursorPlugin(this.options.yProvider.awareness, {
                    cursorBuilder,
                    getSelection: state => state.selection,
                    selectionBuilder
                }, "cursor")
            ];
        }
        return [];
    }
}
//# sourceMappingURL=Sync.js.map