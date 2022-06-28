import { EditorView } from "prosemirror-view";
import * as React from "react";
import baseDictionary from "../dictionary";
import { SearchResult } from "./LinkEditor";
declare type Props = {
    isActive: boolean;
    view: EditorView;
    dictionary: typeof baseDictionary;
    onCreateLink?: (title: string) => Promise<string>;
    onSearchLink?: (term: string) => Promise<SearchResult[]>;
    onClickLink: (href: string, event: React.MouseEvent<HTMLButtonElement>) => void;
    onShowToast: (message: string) => void;
    onClose: () => void;
};
export default class LinkToolbar extends React.Component<Props> {
    menuRef: React.RefObject<HTMLDivElement>;
    state: {
        left: number;
        top: undefined;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleClickOutside: (event: Event) => void;
    handleOnCreateLink: (title: string) => Promise<void>;
    handleOnSelectLink: ({ href, title, }: {
        href: string;
        title: string;
        from: number;
        to: number;
    }) => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=LinkToolbar.d.ts.map