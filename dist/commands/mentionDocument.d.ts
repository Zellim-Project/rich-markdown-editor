import { EditorView } from "prosemirror-view";
import baseDictionary from "../dictionary";
import { IDoc } from "./linkDocument";
declare const mentionDocument: (view: EditorView, event: Event, pos: number, options: {
    dictionary: typeof baseDictionary;
    mentionDocument?: (() => Promise<IDoc>) | undefined;
    onShowToast?: ((message: string, code: string) => void) | undefined;
}) => void;
export default mentionDocument;
//# sourceMappingURL=mentionDocument.d.ts.map