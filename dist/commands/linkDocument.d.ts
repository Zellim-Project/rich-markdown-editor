import { EditorView } from "prosemirror-view";
import baseDictionary from "../dictionary";
export declare type IDoc = {
    docId: string;
    docName: string;
    icon: string;
};
declare const linkDocument: (view: EditorView, event: Event, pos: number, options: {
    dictionary: typeof baseDictionary;
    linkDocument?: (() => Promise<IDoc>) | undefined;
    onShowToast?: ((message: string, code: string) => void) | undefined;
}) => void;
export default linkDocument;
//# sourceMappingURL=linkDocument.d.ts.map