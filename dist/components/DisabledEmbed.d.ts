/// <reference types="react" />
import { DefaultTheme, ThemeProps } from "styled-components";
import { EmbedDescriptor } from "../types";
declare type Props = {
    isSelected: boolean;
    isEditable: boolean;
    embed: EmbedDescriptor;
    attrs: {
        href: string;
        matches: RegExpMatchArray;
    };
};
export default function DisabledEmbed(props: Props & ThemeProps<DefaultTheme>): JSX.Element;
export {};
//# sourceMappingURL=DisabledEmbed.d.ts.map