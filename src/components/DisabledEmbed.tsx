/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OpenIcon } from "outline-icons";
import * as React from "react";
import { DefaultTheme, ThemeProps } from "styled-components";
import { EmbedDescriptor } from "../types";
import Widget from "./Widget";

type Props = {
  isSelected: boolean;
  isEditable: boolean;
  embed: EmbedDescriptor;
  attrs: {
    href: string;
    matches: RegExpMatchArray;
  };
};

export default function DisabledEmbed(props: Props & ThemeProps<DefaultTheme>) {
  return (
    <Widget
      title={props.embed.title}
      href={props.attrs.href}
      icon={props.embed.icon(undefined)}
      context={props.attrs.href.replace(/^https?:\/\//, "")}
      isSelected={props.isSelected}
      theme={props.theme}
    >
      <OpenIcon color="currentColor" size={20} />
    </Widget>
  );
}
