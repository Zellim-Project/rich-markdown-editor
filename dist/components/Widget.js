import * as React from "react";
import styled, { css } from "styled-components";
export default function Widget(props) {
    return (React.createElement(Wrapper, { className: props.isSelected ? "ProseMirror-selectednode widget" : "widget", href: props.href, target: "_blank", rel: "noreferrer nofollow" },
        props.icon,
        React.createElement(Preview, null,
            React.createElement(Title, null, props.title),
            React.createElement(Subtitle, null, props.context),
            React.createElement(Children, null, props.children))));
}
const Children = styled.div `
  margin-left: auto;
  height: 20px;
  opacity: 0;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;
const Title = styled.strong `
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.text};
`;
const Preview = styled.div `
  gap: 8px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  color: ${(props) => props.theme.textTertiary};
`;
const Subtitle = styled.span `
  font-size: 13px;
  color: ${(props) => props.theme.textTertiary} !important;
  line-height: 0;
`;
const Wrapper = styled.a `
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text} !important;
  box-shadow: 0 0 0 1px ${(props) => props.theme.divider};
  white-space: nowrap;
  border-radius: 8px;
  padding: 6px 8px;
  max-width: 840px;
  cursor: default;

  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;

  ${(props) => props.href &&
    css `
      &:hover,
      &:active {
        cursor: pointer !important;
        text-decoration: none !important;
        background: ${(props) => props.theme.secondaryBackground};

        ${Children} {
          opacity: 1;
        }
      }
    `}
`;
//# sourceMappingURL=Widget.js.map