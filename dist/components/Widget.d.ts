import * as React from "react";
import { DefaultTheme, ThemeProps } from "styled-components";
declare type Props = {
    icon: React.ReactNode;
    title: React.ReactNode;
    context?: React.ReactNode;
    href: string;
    isSelected: boolean;
    children?: React.ReactNode;
};
export default function Widget(props: Props & ThemeProps<DefaultTheme>): JSX.Element;
export {};
//# sourceMappingURL=Widget.d.ts.map