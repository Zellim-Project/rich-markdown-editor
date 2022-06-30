import * as React from "react";
declare type Props = React.HTMLAttributes<HTMLLIElement> & {
    icon: React.ReactNode;
    selected: boolean;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
};
declare function LinkSearchResult({ title, subtitle, selected, icon, ...rest }: Props): JSX.Element;
export default LinkSearchResult;
//# sourceMappingURL=LinkSearchResult.d.ts.map