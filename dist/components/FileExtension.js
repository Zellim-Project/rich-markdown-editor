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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const color_1 = require("../utils/color");
function FileExtension(props) {
    const parts = props.title.split(".");
    const extension = parts.length > 1 ? parts.pop() : undefined;
    return (React.createElement(Icon, { style: { background: (0, color_1.stringToColor)(extension || "") }, "$size": props.size || 28 }, extension ? (React.createElement("span", null, extension?.slice(0, 4))) : (React.createElement(outline_icons_1.AttachmentIcon, { color: "currentColor" }))));
}
exports.default = FileExtension;
const Icon = styled_components_1.default.span `
  font-family: ${props => props.theme.fontFamilyMono};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  text-transform: uppercase;
  color: white;
  text-align: center;
  border-radius: 4px;

  min-width: ${props => props.$size}px;
  height: ${props => props.$size}px;
`;
//# sourceMappingURL=FileExtension.js.map