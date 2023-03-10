import * as React from "react";
import { EditorView } from "prosemirror-view";
import { EmbedDescriptor, MenuItem } from "../types";
import { ITask } from "../commands/embedATask";
import { IDoc } from "../commands/linkDocument";
import { IProject } from "../commands/embedAProject";
import baseDictionary from "../dictionary";
export declare type Props<T extends MenuItem = MenuItem> = {
    rtl: boolean;
    isActive: boolean;
    commands: Record<string, any>;
    dictionary: typeof baseDictionary;
    view: EditorView;
    search: string;
    uploadImage?: (file: File) => Promise<{
        src: string;
        type: string;
    }>;
    onImageUploadStart?: () => void;
    onImageUploadStop?: () => void;
    uploadFile?: (file: File) => Promise<string>;
    onFileUploadStart?: () => void;
    onFileUploadStop?: () => void;
    embedATask?: () => Promise<ITask>;
    embedAProject?: () => Promise<IProject>;
    linkDocument?: () => Promise<IDoc>;
    onShowToast?: (message: string, id: string) => void;
    onLinkToolbarOpen?: () => void;
    onClose: () => void;
    onClearSearch: (blockName?: string) => void;
    embeds?: EmbedDescriptor[];
    renderMenuItem: (item: T, index: number, options: {
        selected: boolean;
        onClick: () => void;
    }) => React.ReactNode;
    filterable?: boolean;
    items: T[];
    id?: string;
};
declare type State = {
    insertItem?: EmbedDescriptor;
    left?: number;
    top?: number;
    bottom?: number;
    isAbove: boolean;
    selectedIndex: number;
};
declare class CommandMenu<T = MenuItem> extends React.Component<Props<T>, State> {
    menuRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    fileInputRef: React.RefObject<HTMLInputElement>;
    embedTaskRef: React.RefObject<HTMLInputElement>;
    embedProjectRef: React.RefObject<HTMLInputElement>;
    linkDocumentRef: React.RefObject<HTMLInputElement>;
    state: State;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    handleMouseDown: (event: MouseEvent) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    insertItem: (item: MenuItem | EmbedDescriptor) => void;
    close: () => void;
    handleLinkInputKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleLinkInputPaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
    triggerImagePick: () => void;
    triggerFilePick: () => void;
    triggerEmbedATask: () => void;
    triggerEmbedAProject: () => void;
    triggerLinkDocument: () => void;
    triggerLinkInput: (item: any) => void;
    handleImagePicked: (event: any) => void;
    handleFilePicked: (event: any) => void;
    handleEmbedATask: (event: any) => void;
    handleEmbedAProject: (event: any) => void;
    handleLinkDocument: (event: any) => void;
    clearSearch: (blockName?: string | undefined) => void;
    insertBlock(item: MenuItem | EmbedDescriptor): void;
    get caretPosition(): {
        top: number;
        left: number;
    };
    calculatePosition(props: any): {
        left: number;
        top: undefined;
        bottom: number;
        isAbove: boolean;
    } | {
        left: number;
        top: any;
        bottom: undefined;
        isAbove: boolean;
    };
    get filtered(): (MenuItem | EmbedDescriptor)[];
    render(): JSX.Element;
}
export declare const Wrapper: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, {
    active: boolean;
    top?: number | undefined;
    bottom?: number | undefined;
    left?: number | undefined;
    isAbove: boolean;
}, never>;
export default CommandMenu;
//# sourceMappingURL=CommandMenu.d.ts.map