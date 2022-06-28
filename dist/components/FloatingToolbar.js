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
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_tables_1 = require("prosemirror-tables");
const React = __importStar(require("react"));
const react_portal_1 = require("react-portal");
const styled_components_1 = __importDefault(require("styled-components"));
const depths_1 = __importDefault(require("../styles/depths"));
const useComponentSize_1 = __importDefault(require("../hooks/useComponentSize"));
const useEventListener_1 = __importDefault(require("../hooks/useEventListener"));
const useMediaQuery_1 = __importDefault(require("../hooks/useMediaQuery"));
const useViewportHeight_1 = __importDefault(require("../hooks/useViewportHeight"));
const defaultPosition = {
    left: -1000,
    top: 0,
    offset: 0,
    visible: false,
};
function usePosition({ menuRef, isSelectingText, props, }) {
    const { view, active } = props;
    const { selection } = view.state;
    const { width: menuWidth, height: menuHeight } = (0, useComponentSize_1.default)(menuRef);
    const viewportHeight = (0, useViewportHeight_1.default)();
    const isTouchDevice = (0, useMediaQuery_1.default)("(hover: none) and (pointer: coarse)");
    if (!active ||
        !menuWidth ||
        !menuHeight ||
        !menuRef.current ||
        isSelectingText) {
        return defaultPosition;
    }
    if (isTouchDevice && viewportHeight) {
        return {
            left: 0,
            right: 0,
            top: viewportHeight - menuHeight,
            offset: 0,
            visible: true,
        };
    }
    let fromPos;
    let toPos;
    try {
        fromPos = view.coordsAtPos(selection.from);
        toPos = view.coordsAtPos(selection.to, -1);
    }
    catch (err) {
        console.warn(err);
        return defaultPosition;
    }
    const selectionBounds = {
        top: Math.min(fromPos.top, toPos.top),
        bottom: Math.max(fromPos.bottom, toPos.bottom),
        left: Math.min(fromPos.left, toPos.left),
        right: Math.max(fromPos.right, toPos.right),
    };
    const isColSelection = selection instanceof prosemirror_tables_1.CellSelection &&
        selection.isColSelection &&
        selection.isColSelection();
    const isRowSelection = selection instanceof prosemirror_tables_1.CellSelection &&
        selection.isRowSelection &&
        selection.isRowSelection();
    if (isColSelection) {
        const { node: element } = view.domAtPos(selection.from);
        const { width } = element.getBoundingClientRect();
        selectionBounds.top -= 20;
        selectionBounds.right = selectionBounds.left + width;
    }
    if (isRowSelection) {
        selectionBounds.right = selectionBounds.left = selectionBounds.left - 18;
    }
    const isImageSelection = selection instanceof prosemirror_state_1.NodeSelection && selection.node?.type.name === "image";
    if (isImageSelection) {
        const element = view.nodeDOM(selection.from);
        const imageElement = element.getElementsByTagName("img")[0];
        const { left, top, width } = imageElement.getBoundingClientRect();
        return {
            left: Math.round(left + width / 2 + window.scrollX - menuWidth / 2),
            top: Math.round(top + window.scrollY - menuHeight),
            offset: 0,
            visible: true,
        };
    }
    else {
        const halfSelection = Math.abs(selectionBounds.right - selectionBounds.left) / 2;
        const centerOfSelection = selectionBounds.left + halfSelection;
        const margin = 12;
        const left = Math.min(window.innerWidth - menuWidth - margin, Math.max(margin, centerOfSelection - menuWidth / 2));
        const top = Math.min(window.innerHeight - menuHeight - margin, Math.max(margin, selectionBounds.top - menuHeight));
        const offset = left - (centerOfSelection - menuWidth / 2);
        return {
            left: Math.round(left + window.scrollX),
            top: Math.round(top + window.scrollY),
            offset: Math.round(offset),
            visible: true,
        };
    }
}
const FloatingToolbar = React.forwardRef((props, forwardedRef) => {
    const menuRef = forwardedRef || React.createRef();
    const [isSelectingText, setSelectingText] = React.useState(false);
    const position = usePosition({
        menuRef,
        isSelectingText,
        props,
    });
    (0, useEventListener_1.default)("mouseup", () => {
        setSelectingText(false);
    });
    (0, useEventListener_1.default)("mousedown", () => {
        if (!props.active) {
            setSelectingText(true);
        }
    });
    return (React.createElement(react_portal_1.Portal, null,
        React.createElement(Wrapper, { active: props.active && position.visible, ref: menuRef, offset: position.offset, style: {
                top: `${position.top}px`,
                left: `${position.left}px`,
            } }, props.children)));
});
const Wrapper = styled_components_1.default.div `
  will-change: opacity, transform;
  padding: 8px 16px;
  position: absolute;
  z-index: ${depths_1.default.editorToolbar};
  opacity: 0;
  background-color: ${props => props.theme.toolbarBackground};
  border-radius: 4px;
  transform: scale(0.95);
  transition: opacity 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 150ms;
  line-height: 0;
  height: 40px;
  box-sizing: border-box;
  pointer-events: none;
  white-space: nowrap;

  &::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    transform: translateX(-50%) rotate(45deg);
    background: ${props => props.theme.toolbarBackground};
    border-radius: 3px;
    z-index: -1;
    position: absolute;
    bottom: -2px;
    left: calc(50% - ${props => props.offset || 0}px);
    pointer-events: none;
  }

  * {
    box-sizing: border-box;
  }

  ${({ active }) => active &&
    `
    transform: translateY(-6px) scale(1);
    opacity: 1;
  `};

  @media print {
    display: none;
  }

  @media (hover: none) and (pointer: coarse) {
    &:before {
      display: none;
    }

    transition: opacity 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: scale(1);
    border-radius: 0;
    width: 100vw;
    position: fixed;
  }
`;
exports.default = FloatingToolbar;
//# sourceMappingURL=FloatingToolbar.js.map