import * as React from "react";
import { DownloadIcon } from "outline-icons";
import { Plugin, TextSelection, NodeSelection } from "prosemirror-state";
import { InputRule } from "prosemirror-inputrules";
import styled from "styled-components";
import ImageZoom from "react-medium-image-zoom";
import getDataTransferFiles from "../lib/getDataTransferFiles";
import uploadPlaceholderPlugin from "../lib/uploadPlaceholder";
import insertFiles from "../commands/insertFiles";
import Node from "./Node";
const IMAGE_INPUT_REGEX = /!\[(?<alt>[^\]-]*?)(?:&-&(?<type>[^\]-]*?))?\]\((?<filename>[^\]\[]*?)(?=\“|\))\“?(?<layoutclass>[^\]\[\”]+)?\”?\)$/;
const uploadPlugin = (options) => new Plugin({
    props: {
        handleDOMEvents: {
            paste(view, event) {
                if ((view.props.editable && !view.props.editable(view.state)) ||
                    !options.uploadImage) {
                    return false;
                }
                if (!event.clipboardData)
                    return false;
                const files = Array.prototype.slice
                    .call(event.clipboardData.items)
                    .map((dt) => dt.getAsFile())
                    .filter((file) => file);
                if (files.length === 0)
                    return false;
                const { tr } = view.state;
                if (!tr.selection.empty) {
                    tr.deleteSelection();
                }
                const pos = tr.selection.from;
                insertFiles(view, event, pos, files, options);
                return true;
            },
            drop(view, event) {
                if ((view.props.editable && !view.props.editable(view.state)) ||
                    !options.uploadImage) {
                    return false;
                }
                const files = getDataTransferFiles(event).filter((file) => /image/i.test(file.type));
                if (files.length === 0) {
                    return false;
                }
                const result = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });
                if (result) {
                    insertFiles(view, event, result.pos, files, options);
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
    const extension = node.attrs.type || "png";
    const potentialName = node.attrs.alt || "image";
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `${potentialName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
export default class Image extends Node {
    constructor() {
        super(...arguments);
        this.handleKeyDown = ({ node, getPos }) => (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const { view } = this.editor;
                const $pos = view.state.doc.resolve(getPos() + node.nodeSize);
                view.dispatch(view.state.tr.setSelection(new TextSelection($pos)).split($pos.pos));
                view.focus();
                return;
            }
            if (event.key === "Backspace" && event.target.innerText === "") {
                const { view } = this.editor;
                const $pos = view.state.doc.resolve(getPos());
                const tr = view.state.tr.setSelection(new NodeSelection($pos));
                view.dispatch(tr.deleteSelection());
                view.focus();
                return;
            }
        };
        this.handleBlur = ({ node, getPos }) => (event) => {
            const alt = event.target.innerText;
            const { src, type, title, layoutClass } = node.attrs;
            if (alt === node.attrs.alt)
                return;
            const { view } = this.editor;
            const { tr } = view.state;
            const pos = getPos();
            const transaction = tr.setNodeMarkup(pos, undefined, {
                src,
                type,
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
            const transaction = view.state.tr.setSelection(new NodeSelection($pos));
            view.dispatch(transaction);
        };
        this.handleDownload = ({ node }) => (event) => {
            event.preventDefault();
            event.stopPropagation();
            downloadImageNode(node);
        };
        this.component = (props) => {
            const { theme, isSelected } = props;
            const { alt, type, src, title, layoutClass } = props.node.attrs;
            const className = layoutClass ? `image image-${layoutClass}` : "image";
            return (React.createElement("div", { contentEditable: false, className: className },
                React.createElement(ImageWrapper, { className: isSelected ? "ProseMirror-selectednode" : "", onClick: this.handleSelect(props) },
                    React.createElement(Button, null,
                        React.createElement(DownloadIcon, { color: "currentColor", onClick: this.handleDownload(props) })),
                    React.createElement(ImageZoom, { image: {
                            src,
                            alt,
                            type,
                            title,
                        }, defaultStyles: {
                            overlay: {
                                backgroundColor: theme.background,
                            },
                        }, shouldRespectMaxDimension: true })),
                React.createElement(Caption, { onKeyDown: this.handleKeyDown(props), onBlur: this.handleBlur(props), className: "caption", tabIndex: -1, role: "textbox", contentEditable: true, suppressContentEditableWarning: true, "data-caption": this.options.dictionary.imageCaptionPlaceholder }, alt)));
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
                type: {
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
                            type: img?.getAttribute("type"),
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
                            type: dom?.getAttribute("type"),
                            title: dom.getAttribute("title"),
                        };
                    },
                },
            ],
            toDOM: (node) => {
                const className = node.attrs.layoutClass
                    ? `image image-${node.attrs.layoutClass}`
                    : "image";
                return [
                    "div",
                    {
                        class: className,
                    },
                    ["img", { ...node.attrs, contentEditable: false }],
                    ["p", { class: "caption" }, 0],
                ];
            },
        };
    }
    toMarkdown(state, node) {
        let markdown = " ![" +
            state.esc((node.attrs.alt || "").replace("\n", "") || "") +
            "&-&" +
            state.esc((node.attrs.type || "").replace("\n", "") || "") +
            "](" +
            state.esc(node.attrs.src);
        if (node.attrs.layoutClass) {
            markdown += ' "' + state.esc(node.attrs.layoutClass) + '"';
        }
        else if (node.attrs.title) {
            markdown += ' "' + state.esc(node.attrs.title) + '"';
        }
        markdown += ")";
        state.ensureNewLine();
        state.write(markdown);
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            node: "image",
            getAttrs: (token) => {
                return {
                    src: token.attrGet("src"),
                    alt: token.content.split("&-&")[0],
                    type: token.content.split("&-&")[1],
                    ...getLayoutAndTitle(token.attrGet("title")),
                };
            },
        };
    }
    commands({ type }) {
        return {
            downloadImage: () => async (state) => {
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
                const { uploadImage, onImageUploadStart, onImageUploadStop, onShowToast, } = this.editor.props;
                if (!uploadImage) {
                    throw new Error("uploadImage prop is required to replace images");
                }
                const inputElement = document.createElement("input");
                inputElement.type = "file";
                inputElement.accept = "image/*";
                inputElement.onchange = (event) => {
                    const files = getDataTransferFiles(event);
                    insertFiles(view, event, state.selection.from, files, {
                        uploadImage,
                        onImageUploadStart,
                        onImageUploadStop,
                        onShowToast,
                        dictionary: this.options.dictionary,
                        replaceExisting: true,
                    });
                };
                inputElement.click();
            },
            alignCenter: () => (state, dispatch) => {
                const attrs = { ...state.selection.node.attrs, layoutClass: null };
                const { selection } = state;
                dispatch(state.tr.setNodeMarkup(selection.from, undefined, attrs));
                return true;
            },
            createImage: (attrs) => (state, dispatch) => {
                const { selection } = state;
                const position = selection.$cursor
                    ? selection.$cursor.pos
                    : selection.$to.pos;
                const node = type.create(attrs);
                const transaction = state.tr.insert(position, node);
                dispatch(transaction);
                return true;
            },
        };
    }
    keys() {
        return {
            "Shift-Enter": () => {
                const { state, dispatch } = this.editor.view;
                const sel = state.selection, { $from, $to } = sel;
                const side = (!$from.parentOffset && $to.index() < $to.parent.childCount
                    ? $from
                    : $to).pos;
                const tr = state.tr.insert(side, this.editor.schema.nodes.paragraph.createAndFill());
                tr.setSelection(TextSelection.create(tr.doc, side + 2));
                dispatch(tr.scrollIntoView());
            },
        };
    }
    inputRules({ type }) {
        return [
            new InputRule(IMAGE_INPUT_REGEX, (state, match, start, end) => {
                const [okay, alt, imageType, src, matchedTitle] = match;
                const { tr } = state;
                if (okay) {
                    tr.replaceWith(start - 1, end, type.create({
                        src,
                        type: imageType,
                        alt,
                        ...getLayoutAndTitle(matchedTitle),
                    }));
                }
                return tr;
            }),
        ];
    }
    get plugins() {
        return [uploadPlaceholderPlugin, uploadPlugin(this.options)];
    }
}
const Button = styled.button `
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textSecondary};
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
    color: ${(props) => props.theme.text};
    opacity: 1;
  }
`;
const Caption = styled.p `
  border: 0;
  display: block;
  font-size: 13px;
  font-style: italic;
  font-weight: normal;
  color: ${(props) => props.theme.textSecondary};
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
    color: ${(props) => props.theme.placeholder};
    content: attr(data-caption);
    pointer-events: none;
  }
`;
const ImageWrapper = styled.span `
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