"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styled_components_1 = __importStar(require("styled-components"));
function Widget(props) {
    return (React.createElement(Wrapper, { className: props.isSelected ? "ProseMirror-selectednode widget" : "widget", href: props.href, target: "_blank", rel: "noreferrer nofollow" },
        props.icon,
        React.createElement(Preview, null,
            React.createElement(Title, null, props.title),
            React.createElement(Subtitle, null, props.context),
            React.createElement(Children, null, props.children))));
}
exports.default = Widget;
const Children = styled_components_1.default.div `
  margin-left: auto;
  height: 20px;
  opacity: 0;

  &:hover {
    color: ${props => props.theme.text};
  }
`;
const Title = styled_components_1.default.strong `
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.theme.text};
`;
const Preview = styled_components_1.default.div `
  gap: 8px;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  color: ${props => props.theme.textTertiary};
`;
const Subtitle = styled_components_1.default.span `
  font-size: 13px;
  color: ${props => props.theme.textTertiary} !important;
  line-height: 0;
`;
const Wrapper = styled_components_1.default.a `
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text} !important;
  box-shadow: 0 0 0 1px ${props => props.theme.divider};
  white-space: nowrap;
  border-radius: 8px;
  padding: 6px 8px;
  max-width: 840px;
  cursor: default;

  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;

  ${props => props.href &&
    (0, styled_components_1.css) `
      &:hover,
      &:active {
        cursor: pointer !important;
        text-decoration: none !important;
        background: ${props => props.theme.secondaryBackground};

        ${Children} {
          opacity: 1;
        }
      }
    `}
`;
//# sourceMappingURL=Widget.js.map