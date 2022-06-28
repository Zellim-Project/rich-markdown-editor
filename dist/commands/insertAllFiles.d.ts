import { EditorView } from "prosemirror-view";
export declare type Options = {
    uploadFile: any;
    onFileUploadStart: any;
    onFileUploadStop: any;
    onShowToast: any;
    dictionary: any;
};
declare const insertAllFiles: (view: EditorView<any>, event: ClipboardEvent | DragEvent, pos: number, files: string | any[], options: Options) => void;
export default insertAllFiles;
//# sourceMappingURL=insertAllFiles.d.ts.map