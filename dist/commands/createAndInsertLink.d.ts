import { EditorView } from "prosemirror-view";
declare const createAndInsertLink: (view: EditorView, title: string, href: string, options: {
    dictionary: any;
    onCreateLink: (title: string) => Promise<string>;
    onShowToast: (message: string) => void;
}) => Promise<void>;
export default createAndInsertLink;
//# sourceMappingURL=createAndInsertLink.d.ts.map