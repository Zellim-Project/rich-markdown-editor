"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const outline_icons_1 = require("outline-icons");
const prosemirror_commands_1 = require("prosemirror-commands");
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_view_1 = require("prosemirror-view");
const react_dom_1 = __importDefault(require("react-dom"));
const urls_1 = require("../utils/urls");
const findLinkNodes_1 = __importDefault(require("../queries/findLinkNodes"));
const types_1 = require("../types");
const Mark_1 = __importDefault(require("./Mark"));
const LINK_INPUT_REGEX = /\[([^[]+)]\((\S+)\)$/;
let icon;
if (typeof window !== "undefined") {
    const component = react_1.default.createElement(outline_icons_1.OpenIcon, { color: "currentColor", size: 16 });
    icon = document.createElement("span");
    icon.className = "external-link";
    react_dom_1.default.render(component, icon);
}
function isPlainURL(link, parent, index, side) {
    if (link.attrs.title || !/^\w+:/.test(link.attrs.href)) {
        return false;
    }
    const content = parent.child(index + (side < 0 ? -1 : 0));
    if (!content.isText ||
        content.text !== link.attrs.href ||
        content.marks[content.marks.length - 1] !== link) {
        return false;
    }
    if (index === (side < 0 ? 1 : parent.childCount - 1)) {
        return true;
    }
    const next = parent.child(index + (side < 0 ? -2 : 1));
    return !link.isInSet(next.marks);
}
class Link extends Mark_1.default {
    get name() {
        return "link";
    }
    get schema() {
        return {
            attrs: {
                href: {
                    default: "",
                },
            },
            inclusive: false,
            parseDOM: [
                {
                    tag: "a[href]",
                    getAttrs: (dom) => ({
                        href: dom.getAttribute("href"),
                    }),
                },
            ],
            toDOM: node => [
                "a",
                {
                    ...node.attrs,
                    rel: "noopener noreferrer nofollow",
                },
                0,
            ],
        };
    }
    inputRules({ type }) {
        return [
            new prosemirror_inputrules_1.InputRule(LINK_INPUT_REGEX, (state, match, start, end) => {
                const [okay, alt, href] = match;
                const { tr } = state;
                if (okay) {
                    tr.replaceWith(start, end, this.editor.schema.text(alt)).addMark(start, start + alt.length, type.create({ href }));
                }
                return tr;
            }),
        ];
    }
    commands({ type }) {
        return ({ href } = { href: "" }) => (0, prosemirror_commands_1.toggleMark)(type, { href });
    }
    keys({ type }) {
        return {
            "Mod-k": (state, dispatch) => {
                if (state.selection.empty) {
                    this.editor.events.emit(types_1.EventType.linkMenuOpen);
                    return true;
                }
                return (0, prosemirror_commands_1.toggleMark)(type, { href: "" })(state, dispatch);
            },
        };
    }
    get plugins() {
        const getLinkDecorations = (state) => {
            const decorations = [];
            const links = (0, findLinkNodes_1.default)(state.doc);
            links.forEach(nodeWithPos => {
                const linkMark = nodeWithPos.node.marks.find(mark => mark.type.name === "link");
                if (linkMark && (0, urls_1.isExternalUrl)(linkMark.attrs.href)) {
                    decorations.push(prosemirror_view_1.Decoration.widget(nodeWithPos.pos + nodeWithPos.node.nodeSize, () => icon.cloneNode(true), {
                        side: 1,
                        key: "external-link",
                    }));
                }
            });
            return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
        };
        const plugin = new prosemirror_state_1.Plugin({
            state: {
                init: (config, state) => {
                    return getLinkDecorations(state);
                },
                apply: (tr, decorationSet, _oldState, newState) => {
                    return tr.docChanged ? getLinkDecorations(newState) : decorationSet;
                },
            },
            props: {
                decorations: state => plugin.getState(state),
                handleDOMEvents: {
                    mouseover: (view, event) => {
                        if (event.target instanceof HTMLAnchorElement &&
                            !event.target.className.includes("ProseMirror-widget") &&
                            (!view.editable || (view.editable && !view.hasFocus()))) {
                            if (this.options.onHoverLink) {
                                return this.options.onHoverLink(event);
                            }
                        }
                        return false;
                    },
                    mousedown: (view, event) => {
                        if (!(event.target instanceof HTMLAnchorElement)) {
                            return false;
                        }
                        if (event.target.matches(".component-attachment *")) {
                            return false;
                        }
                        if (!view.editable || (view.editable && !view.hasFocus())) {
                            const href = event.target.href ||
                                (event.target.parentNode instanceof HTMLAnchorElement
                                    ? event.target.parentNode.href
                                    : "");
                            const isHashtag = href.startsWith("#");
                            if (isHashtag && this.options.onClickHashtag) {
                                event.stopPropagation();
                                event.preventDefault();
                                this.options.onClickHashtag(href, event);
                            }
                            if (this.options.onClickLink) {
                                event.stopPropagation();
                                event.preventDefault();
                                this.options.onClickLink(href, event);
                            }
                            return true;
                        }
                        return false;
                    },
                    click: (view, event) => {
                        if (!(event.target instanceof HTMLAnchorElement)) {
                            return false;
                        }
                        if (event.target.matches(".component-attachment *")) {
                            return false;
                        }
                        if (this.options.onClickLink) {
                            event.stopPropagation();
                            event.preventDefault();
                        }
                        return false;
                    },
                },
            },
        });
        return [plugin];
    }
    toMarkdown() {
        return {
            open(_state, mark, parent, index) {
                return isPlainURL(mark, parent, index, 1) ? "<" : "[";
            },
            close(state, mark, parent, index) {
                return isPlainURL(mark, parent, index, -1)
                    ? ">"
                    : "](" +
                        state.esc(mark.attrs.href) +
                        (mark.attrs.title ? " " + state.quote(mark.attrs.title) : "") +
                        ")";
            },
        };
    }
    parseMarkdown() {
        return {
            mark: "link",
            getAttrs: (tok) => ({
                href: tok.attrGet("href"),
                title: tok.attrGet("title") || null,
            }),
        };
    }
}
exports.default = Link;
//# sourceMappingURL=Link.js.map