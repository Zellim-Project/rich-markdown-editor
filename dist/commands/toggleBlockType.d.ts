import { NodeType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { Dispatch } from "../types";
export default function toggleBlockType(type: NodeType, toggleType: NodeType, attrs?: {}): (state: EditorState, dispatch?: Dispatch | undefined) => boolean;
//# sourceMappingURL=toggleBlockType.d.ts.map