import { EditorView } from "prosemirror-view";
import * as React from "react";
declare type Props = {
    active?: boolean;
    view: EditorView;
    children: React.ReactNode;
    forwardedRef?: React.RefObject<HTMLDivElement> | null;
};
declare const FloatingToolbar: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
export default FloatingToolbar;
//# sourceMappingURL=FloatingToolbar.d.ts.map