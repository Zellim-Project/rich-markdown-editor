import { EditorView } from "prosemirror-view";
import baseDictionary from "../dictionary";
export declare type IProject = {
    projectImg?: string;
    projectColor?: string;
    members: string;
    projectName: string;
    projectId: string;
};
declare const embedAProject: (view: EditorView, event: Event, pos: number, options: {
    dictionary: typeof baseDictionary;
    embedAProject?: (() => Promise<IProject>) | undefined;
    onShowToast?: ((message: string, code: string) => void) | undefined;
}) => void;
export default embedAProject;
//# sourceMappingURL=embedAProject.d.ts.map