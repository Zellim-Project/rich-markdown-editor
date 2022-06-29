import { EditorView } from "prosemirror-view";
export declare type Options = {
    dictionary: any;
    isAttachment?: boolean;
    replaceExisting?: boolean;
    uploadFile?: (file: File) => Promise<string>;
    onFileUploadStart?: () => void;
    onFileUploadStop?: () => void;
    onShowToast: (message: string, id: string) => void;
};
declare const insertFiles: (view: EditorView, event: Event | React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>, pos: number, files: File[], options: Options) => void;
export default insertFiles;
//# sourceMappingURL=insertFiles.d.ts.map