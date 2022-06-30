import { EditorView } from "prosemirror-view";
import * as React from "react";
import { CommandFactory } from "../lib/Extension";
import { SearchResult } from "./LinkEditor";
import baseDictionary from "../dictionary";
declare type Props = {
    dictionary: typeof baseDictionary;
    rtl: boolean;
    isTemplate: boolean;
    commands: Record<string, CommandFactory>;
    onOpen: () => void;
    onClose: () => void;
    onSearchLink?: (term: string) => Promise<SearchResult[]>;
    onClickLink: (href: string, event: MouseEvent | React.MouseEvent<HTMLButtonElement>) => void;
    onCreateLink?: (title: string) => Promise<string>;
    onShowToast: (message: string) => void;
    view: EditorView;
};
export default class SelectionToolbar extends React.Component<Props> {
    isActive: boolean;
    menuRef: React.RefObject<HTMLDivElement>;
    componentDidUpdate(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleClickOutside: (ev: MouseEvent) => void;
    handleOnCreateLink: (title: string) => Promise<void>;
    handleOnSelectLink: ({ href, from, to, }: {
        href: string;
        from: number;
        to: number;
    }) => void;
    render(): JSX.Element | null;
}
export {};
//# sourceMappingURL=SelectionToolbar.d.ts.map