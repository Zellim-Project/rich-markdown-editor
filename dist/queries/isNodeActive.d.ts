import { NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
declare const isNodeActive: (type: NodeType, attrs?: Record<string, any>) => (state: EditorState) => boolean;
export default isNodeActive;
//# sourceMappingURL=isNodeActive.d.ts.map