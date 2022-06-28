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
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_state_1 = require("prosemirror-state");
const React = __importStar(require("react"));
const react_medium_image_zoom_1 = __importDefault(require("react-medium-image-zoom"));
const styled_components_1 = __importDefault(require("styled-components"));
const files_1 = require("../utils/files");
const getDataTransferFiles_1 = __importDefault(require("../utils/getDataTransferFiles"));
const insertFiles_1 = __importDefault(require("../commands/insertFiles"));
const uploadPlaceholder_1 = __importDefault(require("../lib/uploadPlaceholder"));
const Node_1 = __importDefault(require("./Node"));
const IMAGE_INPUT_REGEX = /!\[(?<alt>[^\]\[]*?)]\((?<filename>[^\]\[]*?)(?=\“|\))\“?(?<layoutclass>[^\]\[\”]+)?\”?\)$/;
const uploadPlugin = (options) => new prosemirror_state_1.Plugin({
    props: {
        handleDOMEvents: {
            paste(view, event) {
                if ((view.props.editable && !view.props.editable(view.state)) ||
                    !options.uploadFile) {
                    return false;
                }
                if (!event.clipboardData) {
                    return false;
                }
                const files = Array.prototype.slice
                    .call(event.clipboardData.items)
                    .filter((dt) => dt.kind !== "string")
                    .map((dt) => dt.getAsFile())
                    .filter(Boolean);
                if (files.length === 0) {
                    return false;
                }
                const { tr } = view.state;
                if (!tr.selection.empty) {
                    tr.deleteSelection();
                }
                const pos = tr.selection.from;
                (0, insertFiles_1.default)(view, event, pos, files, options);
                return true;
            },
            drop(view, event) {
                if ((view.props.editable && !view.props.editable(view.state)) ||
                    !options.uploadFile) {
                    return false;
                }
                const files = (0, getDataTransferFiles_1.default)(event).filter((dt) => dt.kind !== "string");
                if (files.length === 0) {
                    return false;
                }
                const result = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });
                if (result) {
                    (0, insertFiles_1.default)(view, event, result.pos, files, options);
                    return true;
                }
                return false;
            },
        },
    },
});
const IMAGE_CLASSES = ["right-50", "left-50"];
const getLayoutAndTitle = (tokenTitle) => {
    if (!tokenTitle)
        return {};
    if (IMAGE_CLASSES.includes(tokenTitle)) {
        return {
            layoutClass: tokenTitle,
        };
    }
    else {
        return {
            title: tokenTitle,
        };
    }
};
const downloadImageNode = async (node) => {
    const image = await fetch(node.attrs.src);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);
    const extension = imageBlob.type.split("/")[1];
    const potentialName = node.attrs.alt || "image";
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `${potentialName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
class Image extends Node_1.default {
    constructor() {
        super(...arguments);
        this.handleKeyDown = ({ node, getPos, }) => (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const { view } = this.editor;
                const $pos = view.state.doc.resolve(getPos() + node.nodeSize);
                view.dispatch(view.state.tr.setSelection(new prosemirror_state_1.TextSelection($pos)).split($pos.pos));
                view.focus();
                return;
            }
            if (event.key === "Backspace" && event.currentTarget.innerText === "") {
                const { view } = this.editor;
                const $pos = view.state.doc.resolve(getPos());
                const tr = view.state.tr.setSelection(new prosemirror_state_1.NodeSelection($pos));
                view.dispatch(tr.deleteSelection());
                view.focus();
                return;
            }
        };
        this.handleBlur = ({ node, getPos, }) => (event) => {
            const alt = event.currentTarget.innerText;
            const { src, title, layoutClass } = node.attrs;
            if (alt === node.attrs.alt) {
                return;
            }
            const { view } = this.editor;
            const { tr } = view.state;
            const pos = getPos();
            const transaction = tr.setNodeMarkup(pos, undefined, {
                src,
                alt,
                title,
                layoutClass,
            });
            view.dispatch(transaction);
        };
        this.handleSelect = ({ getPos }) => (event) => {
            event.preventDefault();
            const { view } = this.editor;
            const $pos = view.state.doc.resolve(getPos());
            const transaction = view.state.tr.setSelection(new prosemirror_state_1.NodeSelection($pos));
            view.dispatch(transaction);
        };
        this.handleDownload = ({ node }) => (event) => {
            event.preventDefault();
            event.stopPropagation();
            downloadImageNode(node);
        };
        this.handleMouseDown = (ev) => {
            if (document.activeElement !== ev.currentTarget) {
                ev.preventDefault();
                ev.stopPropagation();
                ev.currentTarget.focus();
            }
        };
        this.component = (props) => {
            return (React.createElement(ImageComponent, { ...props, onClick: this.handleSelect(props), onDownload: this.handleDownload(props) },
                React.createElement(Caption, { onKeyDown: this.handleKeyDown(props), onBlur: this.handleBlur(props), onMouseDown: this.handleMouseDown, className: "caption", tabIndex: -1, role: "textbox", contentEditable: true, suppressContentEditableWarning: true, "data-caption": this.options.dictionary.imageCaptionPlaceholder }, props.node.attrs.alt)));
        };
    }
    get name() {
        return "image";
    }
    get schema() {
        return {
            inline: true,
            attrs: {
                src: {},
                alt: {
                    default: null,
                },
                layoutClass: {
                    default: null,
                },
                title: {
                    default: null,
                },
            },
            content: "text*",
            marks: "",
            group: "inline",
            selectable: true,
            draggable: true,
            parseDOM: [
                {
                    tag: "div[class~=image]",
                    getAttrs: (dom) => {
                        const img = dom.getElementsByTagName("img")[0];
                        const className = dom.className;
                        const layoutClassMatched = className && className.match(/image-(.*)$/);
                        const layoutClass = layoutClassMatched
                            ? layoutClassMatched[1]
                            : null;
                        return {
                            src: img?.getAttribute("src"),
                            alt: img?.getAttribute("alt"),
                            title: img?.getAttribute("title"),
                            layoutClass: layoutClass,
                        };
                    },
                },
                {
                    tag: "img",
                    getAttrs: (dom) => {
                        return {
                            src: dom.getAttribute("src"),
                            alt: dom.getAttribute("alt"),
                            title: dom.getAttribute("title"),
                        };
                    },
                },
            ],
            toDOM: node => {
                const className = node.attrs.layoutClass
                    ? `image image-${node.attrs.layoutClass}`
                    : "image";
                return [
                    "div",
                    {
                        class: className,
                    },
                    ["img", { ...node.attrs, contentEditable: "false" }],
                    ["p", { class: "caption" }, 0],
                ];
            },
        };
    }
    toMarkdown(state, node) {
        let markdown = " ![" +
            state.esc((node.attrs.alt || "").replace("\n", "") || "", false) +
            "](" +
            state.esc(node.attrs.src || "", false);
        if (node.attrs.layoutClass) {
            markdown += ' "' + state.esc(node.attrs.layoutClass, false) + '"';
        }
        else if (node.attrs.title) {
            markdown += ' "' + state.esc(node.attrs.title, false) + '"';
        }
        markdown += ")";
        state.write(markdown);
    }
    parseMarkdown() {
        return {
            node: "image",
            getAttrs: (token) => {
                return {
                    src: token.attrGet("src"),
                    alt: (token?.children &&
                        token.children[0] &&
                        token.children[0].content) ||
                        null,
                    ...getLayoutAndTitle(token?.attrGet("title")),
                };
            },
        };
    }
    commands({ type }) {
        return {
            downloadImage: () => (state) => {
                if (!(state.selection instanceof prosemirror_state_1.NodeSelection)) {
                    return false;
                }
                const { node } = state.selection;
                if (node.type.name !== "image") {
                    return false;
                }
                downloadImageNode(node);
                return true;
            },
            deleteImage: () => (state, dispatch) => {
                dispatch(state.tr.deleteSelection());
                return true;
            },
            alignRight: () => (state, dispatch) => {
                if (!(state.selection instanceof prosemirror_state_1.NodeSelection)) {
                    return false;
                }
                const attrs = {
                    ...state.selection.node.attrs,
                    title: null,
                    layoutClass: "right-50",
                };
                const { selection } = state;
                dispatch(state.tr.setNodeMarkup(selection.from, undefined, attrs));
                return true;
            },
            alignLeft: () => (state, dispatch) => {
                if (!(state.selection instanceof prosemirror_state_1.NodeSelection)) {
                    return false;
                }
                const attrs = {
                    ...state.selection.node.attrs,
                    title: null,
                    layoutClass: "left-50",
                };
                const { selection } = state;
                dispatch(state.tr.setNodeMarkup(selection.from, undefined, attrs));
                return true;
            },
            replaceImage: () => (state) => {
                const { view } = this.editor;
                const { uploadFile, onFileUploadStart, onFileUploadStop, onShowToast, } = this.editor.props;
                if (!uploadFile) {
                    throw new Error("uploadFile prop is required to replace images");
                }
                const inputElement = document.createElement("input");
                inputElement.type = "file";
                inputElement.accept = files_1.supportedImageMimeTypes.join(", ");
                inputElement.onchange = (event) => {
                    const files = (0, getDataTransferFiles_1.default)(event);
                    (0, insertFiles_1.default)(view, event, state.selection.from, files, {
                        uploadFile,
                        onFileUploadStart,
                        onFileUploadStop,
                        onShowToast,
                        dictionary: this.options.dictionary,
                        replaceExisting: true,
                    });
                };
                inputElement.click();
                return true;
            },
            alignCenter: () => (state, dispatch) => {
                if (!(state.selection instanceof prosemirror_state_1.NodeSelection)) {
                    return false;
                }
                const attrs = { ...state.selection.node.attrs, layoutClass: null };
                const { selection } = state;
                dispatch(state.tr.setNodeMarkup(selection.from, undefined, attrs));
                return true;
            },
            createImage: (attrs) => (state, dispatch) => {
                const { selection } = state;
                const position = selection instanceof prosemirror_state_1.TextSelection
                    ? selection.$cursor?.pos
                    : selection.$to.pos;
                if (position === undefined) {
                    return false;
                }
                const node = type.create(attrs);
                const transaction = state.tr.insert(position, node);
                dispatch(transaction);
                return true;
            },
        };
    }
    inputRules({ type }) {
        return [
            new prosemirror_inputrules_1.InputRule(IMAGE_INPUT_REGEX, (state, match, start, end) => {
                const [okay, alt, src, matchedTitle] = match;
                const { tr } = state;
                if (okay) {
                    tr.replaceWith(start - 1, end, type.create({
                        src,
                        alt,
                        ...getLayoutAndTitle(matchedTitle),
                    }));
                }
                return tr;
            }),
        ];
    }
    get plugins() {
        return [uploadPlaceholder_1.default, uploadPlugin(this.options)];
    }
}
exports.default = Image;
const ImageComponent = (props) => {
    const { theme, isSelected, node } = props;
    const { alt, src, layoutClass } = node.attrs;
    const className = layoutClass ? `image image-${layoutClass}` : "image";
    const [width, setWidth] = React.useState(0);
    return (React.createElement("div", { contentEditable: false, className: className },
        React.createElement(ImageWrapper, { className: isSelected ? "ProseMirror-selectednode" : "", onClick: props.onClick, style: { width } },
            React.createElement(Button, { onClick: props.onDownload },
                React.createElement(outline_icons_1.DownloadIcon, { color: "currentColor" })),
            React.createElement(react_medium_image_zoom_1.default, { image: {
                    src,
                    alt,
                    onLoad: ev => {
                        setWidth(ev.target.naturalWidth || "50%");
                    },
                }, defaultStyles: {
                    overlay: {
                        backgroundColor: theme.background,
                    },
                }, shouldRespectMaxDimension: true })),
        props.children));
};
const Button = styled_components_1.default.button `
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.textSecondary};
  width: 24px;
  height: 24px;
  display: inline-block;
  cursor: pointer;
  opacity: 0;
  transition: opacity 100ms ease-in-out;

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    color: ${props => props.theme.text};
    opacity: 1;
  }
`;
const Caption = styled_components_1.default.p `
  border: 0;
  display: block;
  font-size: 13px;
  font-style: italic;
  font-weight: normal;
  color: ${props => props.theme.textSecondary};
  padding: 2px 0;
  line-height: 16px;
  text-align: center;
  min-height: 1em;
  outline: none;
  background: none;
  resize: none;
  user-select: text;
  cursor: text;

  &:empty:not(:focus) {
    visibility: hidden;
  }

  &:empty:before {
    color: ${props => props.theme.placeholder};
    content: attr(data-caption);
    pointer-events: none;
  }
`;
const ImageWrapper = styled_components_1.default.span `
  line-height: 0;
  display: inline-block;
  position: relative;

  &:hover {
    ${Button} {
      opacity: 0.9;
    }
  }

  &.ProseMirror-selectednode + ${Caption} {
    visibility: visible;
  }
`;
//# sourceMappingURL=Image.js.map