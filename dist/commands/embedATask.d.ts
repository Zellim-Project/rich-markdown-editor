import { EditorView } from "prosemirror-view";
import baseDictionary from "../dictionary";
export declare type ITask = {
    taskName: string;
    projectName: string;
};
declare const embedATask: (view: EditorView, event: Event, pos: number, options: {
    dictionary: typeof baseDictionary;
    embedATask?: (() => Promise<ITask>) | undefined;
    onShowToast?: ((message: string, code: string) => void) | undefined;
}) => void;
export default embedATask;
//# sourceMappingURL=embedATask.d.ts.map