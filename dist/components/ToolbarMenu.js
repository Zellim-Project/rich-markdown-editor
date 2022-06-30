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
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const EditorContext_1 = require("./EditorContext");
const ToolbarButton_1 = __importDefault(require("./ToolbarButton"));
const ToolbarSeparator_1 = __importDefault(require("./ToolbarSeparator"));
const Tooltip_1 = __importDefault(require("./Tooltip"));
const FlexibleWrapper = styled_components_1.default.div `
  color: ${props => props.theme.toolbarItem};
  display: flex;
  gap: 8px;
`;
function ToolbarMenu(props) {
    const { commands, view } = (0, EditorContext_1.useEditor)();
    const { items } = props;
    const { state } = view;
    return (React.createElement(FlexibleWrapper, null, items.map((item, index) => {
        if (item.name === "separator" && item.visible !== false) {
            return React.createElement(ToolbarSeparator_1.default, { key: index });
        }
        if (item.visible === false || !item.icon) {
            return null;
        }
        const Icon = item.icon;
        const isActive = item.active ? item.active(state) : false;
        return (React.createElement(Tooltip_1.default, { tooltip: item.tooltip || "", key: index },
            React.createElement(ToolbarButton_1.default, { onClick: () => item.name && commands[item.name](item.attrs), active: isActive },
                React.createElement(Icon, { color: "currentColor" }))));
    })));
}
exports.default = ToolbarMenu;
//# sourceMappingURL=ToolbarMenu.js.map