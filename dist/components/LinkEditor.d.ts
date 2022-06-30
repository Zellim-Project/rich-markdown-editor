import { Mark } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import * as React from "react";
import { ToastOptions } from "../types";
import baseDictionary from "../dictionary";
export declare type SearchResult = {
    title: string;
    subtitle?: string;
    url: string;
};
declare type Props = {
    mark?: Mark;
    from: number;
    to: number;
    dictionary: typeof baseDictionary;
    onRemoveLink?: () => void;
    onCreateLink?: (title: string) => Promise<void>;
    onSearchLink?: (term: string) => Promise<SearchResult[]>;
    onSelectLink: (options: {
        href: string;
        title?: string;
        from: number;
        to: number;
    }) => void;
    onClickLink: (href: string, event: React.MouseEvent<HTMLButtonElement>) => void;
    onShowToast: (message: string, options: ToastOptions) => void;
    view: EditorView;
};
declare type State = {
    results: {
        [keyword: string]: SearchResult[];
    };
    value: string;
    previousValue: string;
    selectedIndex: number;
};
declare class LinkEditor extends React.Component<Props, State> {
    discardInputValue: boolean;
    initialValue: string;
    initialSelectionLength: number;
    state: State;
    get href(): string;
    get suggestedLinkTitle(): string;
    componentWillUnmount: () => void;
    save: (href: string, title?: string) => void;
    handleKeyDown: (event: React.KeyboardEvent) => void;
    handleFocusLink: (selectedIndex: number) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handlePaste: () => void;
    handleOpenLink: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleCreateLink: (value: string) => Promise<void>;
    handleRemoveLink: () => void;
    handleSelectLink: (url: string, title: string) => (event: React.MouseEvent) => void;
    moveSelectionToEnd: () => void;
    render(): JSX.Element;
}
export default LinkEditor;
//# sourceMappingURL=LinkEditor.d.ts.map