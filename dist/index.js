"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.theme = exports.Extension = exports.renderToHtml = exports.serializer = exports.parser = exports.schema = void 0;
const React = __importStar(require("react"));
const memoize_1 = __importDefault(require("lodash/memoize"));
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_dropcursor_1 = require("prosemirror-dropcursor");
const prosemirror_gapcursor_1 = require("prosemirror-gapcursor");
const prosemirror_view_1 = require("prosemirror-view");
const prosemirror_model_1 = require("prosemirror-model");
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_keymap_1 = require("prosemirror-keymap");
const prosemirror_commands_1 = require("prosemirror-commands");
const prosemirror_utils_1 = require("prosemirror-utils");
const styled_components_1 = require("styled-components");
const theme_1 = require("./styles/theme");
const dictionary_1 = __importDefault(require("./dictionary"));
const Flex_1 = __importDefault(require("./components/Flex"));
const SelectionToolbar_1 = __importDefault(require("./components/SelectionToolbar"));
const BlockMenu_1 = __importDefault(require("./components/BlockMenu"));
const EmojiMenu_1 = __importDefault(require("./components/EmojiMenu"));
const LinkToolbar_1 = __importDefault(require("./components/LinkToolbar"));
const Tooltip_1 = __importDefault(require("./components/Tooltip"));
const ExtensionManager_1 = __importDefault(require("./lib/ExtensionManager"));
const ComponentView_1 = __importDefault(require("./lib/ComponentView"));
const headingToSlug_1 = __importDefault(require("./lib/headingToSlug"));
const editor_1 = require("./styles/editor");
const Doc_1 = __importDefault(require("./nodes/Doc"));
const HardBreak_1 = __importDefault(require("./nodes/HardBreak"));
const Paragraph_1 = __importDefault(require("./nodes/Paragraph"));
var server_1 = require("./server");
Object.defineProperty(exports, "schema", { enumerable: true, get: function () { return server_1.schema; } });
Object.defineProperty(exports, "parser", { enumerable: true, get: function () { return server_1.parser; } });
Object.defineProperty(exports, "serializer", { enumerable: true, get: function () { return server_1.serializer; } });
Object.defineProperty(exports, "renderToHtml", { enumerable: true, get: function () { return server_1.renderToHtml; } });
var Extension_1 = require("./lib/Extension");
Object.defineProperty(exports, "Extension", { enumerable: true, get: function () { return __importDefault(Extension_1).default; } });
exports.theme = theme_1.light;
class RichMarkdownEditor extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isRTL: false,
            isEditorFocused: false,
            selectionMenuOpen: false,
            blockMenuOpen: false,
            linkMenuOpen: false,
            blockMenuSearch: "",
            emojiMenuOpen: false,
        };
        this.calculateDir = () => {
            if (!this.element)
                return;
            const isRTL = this.props.dir === "rtl" ||
                getComputedStyle(this.element).direction === "rtl";
            if (this.state.isRTL !== isRTL) {
                this.setState({ isRTL });
            }
        };
        this.value = () => {
            return this.serializer.serialize(this.view.state.doc);
        };
        this.handleChange = () => {
            if (!this.props.onChange)
                return;
            this.props.onChange(() => {
                return this.value();
            });
        };
        this.handleSave = () => {
            const { onSave } = this.props;
            if (onSave) {
                onSave({ done: false });
            }
        };
        this.handleSaveAndExit = () => {
            const { onSave } = this.props;
            if (onSave) {
                onSave({ done: true });
            }
        };
        this.handleEditorBlur = () => {
            this.setState({ isEditorFocused: false });
        };
        this.handleEditorFocus = () => {
            this.setState({ isEditorFocused: true });
        };
        this.handleOpenSelectionMenu = () => {
            this.setState({ blockMenuOpen: false, selectionMenuOpen: true });
        };
        this.handleCloseSelectionMenu = () => {
            this.setState({ selectionMenuOpen: false });
        };
        this.handleOpenLinkMenu = () => {
            this.setState({ blockMenuOpen: false, linkMenuOpen: true });
        };
        this.handleCloseLinkMenu = () => {
            this.setState({ linkMenuOpen: false });
        };
        this.handleOpenBlockMenu = (search) => {
            this.setState({ blockMenuOpen: true, blockMenuSearch: search });
        };
        this.handleCloseBlockMenu = () => {
            if (!this.state.blockMenuOpen)
                return;
            this.setState({ blockMenuOpen: false });
        };
        this.handleSelectRow = (index, state) => {
            this.view.dispatch(prosemirror_utils_1.selectRow(index)(state.tr));
        };
        this.handleSelectColumn = (index, state) => {
            this.view.dispatch(prosemirror_utils_1.selectColumn(index)(state.tr));
        };
        this.handleSelectTable = (state) => {
            this.view.dispatch(prosemirror_utils_1.selectTable(state.tr));
        };
        this.focusAtStart = () => {
            const selection = prosemirror_state_1.Selection.atStart(this.view.state.doc);
            const transaction = this.view.state.tr.setSelection(selection);
            this.view.dispatch(transaction);
            this.view.focus();
        };
        this.focusAtEnd = () => {
            const selection = prosemirror_state_1.Selection.atEnd(this.view.state.doc);
            const transaction = this.view.state.tr.setSelection(selection);
            this.view.dispatch(transaction);
            this.view.focus();
        };
        this.getHeadings = () => {
            const headings = [];
            const previouslySeen = {};
            this.view.state.doc.forEach(node => {
                if (node.type.name === "heading") {
                    const slug = headingToSlug_1.default(node);
                    let id = slug;
                    if (previouslySeen[slug] > 0) {
                        id = headingToSlug_1.default(node, previouslySeen[slug]);
                    }
                    previouslySeen[slug] =
                        previouslySeen[slug] !== undefined ? previouslySeen[slug] + 1 : 1;
                    headings.push({
                        title: node.textContent,
                        level: node.attrs.level,
                        id,
                    });
                }
            });
            return headings;
        };
        this.theme = () => {
            return this.props.theme || (this.props.dark ? theme_1.dark : theme_1.light);
        };
        this.dictionary = memoize_1.default((providedDictionary) => {
            return Object.assign(Object.assign({}, dictionary_1.default), providedDictionary);
        });
    }
    componentDidMount() {
        this.init();
        if (this.props.scrollTo) {
            this.scrollToAnchor(this.props.scrollTo);
        }
        this.calculateDir();
        if (this.props.readOnly)
            return;
        if (this.props.autoFocus) {
            this.focusAtEnd();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.value && prevProps.value !== this.props.value) {
            const newState = this.createState(this.props.value);
            this.view.updateState(newState);
        }
        if (prevProps.readOnly !== this.props.readOnly) {
            this.view.update(Object.assign(Object.assign({}, this.view.props), { editable: () => !this.props.readOnly }));
        }
        if (this.props.scrollTo && this.props.scrollTo !== prevProps.scrollTo) {
            this.scrollToAnchor(this.props.scrollTo);
        }
        if (prevProps.readOnly && !this.props.readOnly && this.props.autoFocus) {
            this.focusAtEnd();
        }
        if (prevProps.dir !== this.props.dir) {
            this.calculateDir();
        }
        if (!this.isBlurred &&
            !this.state.isEditorFocused &&
            !this.state.blockMenuOpen &&
            !this.state.linkMenuOpen &&
            !this.state.selectionMenuOpen) {
            this.isBlurred = true;
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        }
        if (this.isBlurred &&
            (this.state.isEditorFocused ||
                this.state.blockMenuOpen ||
                this.state.linkMenuOpen ||
                this.state.selectionMenuOpen)) {
            this.isBlurred = false;
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        }
    }
    init() {
        this.extensions = this.createExtensions();
        this.nodes = this.createNodes();
        this.marks = this.createMarks();
        this.schema = this.createSchema();
        this.plugins = this.createPlugins();
        this.rulePlugins = this.createRulePlugins();
        this.keymaps = this.createKeymaps();
        this.serializer = this.createSerializer();
        this.parser = this.createParser();
        this.pasteParser = this.createPasteParser();
        this.inputRules = this.createInputRules();
        this.nodeViews = this.createNodeViews();
        this.view = this.createView();
        this.commands = this.createCommands();
    }
    createExtensions() {
        return new ExtensionManager_1.default([
            ...[
                new Doc_1.default(),
                new HardBreak_1.default(),
                new Paragraph_1.default(),
            ].filter(extension => {
                if (this.props.disableExtensions) {
                    return !this.props.disableExtensions.includes(extension.name);
                }
                return true;
            }),
            ...(this.props.extensions || []),
        ], this);
    }
    createPlugins() {
        return this.extensions.plugins;
    }
    createRulePlugins() {
        return this.extensions.rulePlugins;
    }
    createKeymaps() {
        return this.extensions.keymaps({
            schema: this.schema,
        });
    }
    createInputRules() {
        return this.extensions.inputRules({
            schema: this.schema,
        });
    }
    createNodeViews() {
        return this.extensions.extensions
            .filter((extension) => extension.component)
            .reduce((nodeViews, extension) => {
            const nodeView = (node, view, getPos, decorations) => {
                return new ComponentView_1.default(extension.component, {
                    editor: this,
                    extension,
                    node,
                    view,
                    getPos,
                    decorations,
                });
            };
            return Object.assign(Object.assign({}, nodeViews), { [extension.name]: nodeView });
        }, {});
    }
    createCommands() {
        return this.extensions.commands({
            schema: this.schema,
            view: this.view,
        });
    }
    createNodes() {
        return this.extensions.nodes;
    }
    createMarks() {
        return this.extensions.marks;
    }
    createSchema() {
        return new prosemirror_model_1.Schema({
            nodes: this.nodes,
            marks: this.marks,
        });
    }
    createSerializer() {
        return this.extensions.serializer();
    }
    createParser() {
        return this.extensions.parser({
            schema: this.schema,
            plugins: this.rulePlugins,
        });
    }
    createPasteParser() {
        return this.extensions.parser({
            schema: this.schema,
            rules: { linkify: true },
            plugins: this.rulePlugins,
        });
    }
    createState(value) {
        const doc = this.createDocument(value || this.props.defaultValue);
        return prosemirror_state_1.EditorState.create({
            schema: this.schema,
            doc,
            plugins: [
                ...this.plugins,
                ...this.keymaps,
                prosemirror_dropcursor_1.dropCursor({ color: this.theme().cursor }),
                prosemirror_gapcursor_1.gapCursor(),
                prosemirror_inputrules_1.inputRules({
                    rules: this.inputRules,
                }),
                prosemirror_keymap_1.keymap(prosemirror_commands_1.baseKeymap),
            ],
        });
    }
    createDocument(content) {
        return this.parser.parse(content);
    }
    createView() {
        if (!this.element) {
            throw new Error("createView called before ref available");
        }
        const isEditingCheckbox = tr => {
            return tr.steps.some((step) => {
                var _a, _b, _c;
                return ((_c = (_b = (_a = step.slice) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.firstChild) === null || _c === void 0 ? void 0 : _c.type.name) ===
                    this.schema.nodes.checkbox_item.name;
            });
        };
        const self = this;
        const view = new prosemirror_view_1.EditorView(this.element, {
            state: this.createState(this.props.value),
            editable: () => !this.props.readOnly,
            nodeViews: this.nodeViews,
            handleDOMEvents: this.props.handleDOMEvents,
            dispatchTransaction: function (transaction) {
                const { state, transactions } = this.state.applyTransaction(transaction);
                this.updateState(state);
                if (transactions.some(tr => tr.docChanged) &&
                    (!self.props.readOnly ||
                        (self.props.readOnlyWriteCheckboxes &&
                            transactions.some(isEditingCheckbox)))) {
                    self.handleChange();
                }
                self.calculateDir();
                self.forceUpdate();
            },
        });
        view.dom.setAttribute("role", "textbox");
        return view;
    }
    scrollToAnchor(hash) {
        if (!hash)
            return;
        try {
            const element = document.querySelector(hash);
            if (element)
                element.scrollIntoView({ behavior: "smooth" });
        }
        catch (err) {
            console.warn(`Attempted to scroll to invalid hash: ${hash}`, err);
        }
    }
    render() {
        const { dir, readOnly, readOnlyWriteCheckboxes, style, tooltip, className, onKeyDown, } = this.props;
        const { isRTL } = this.state;
        const dictionary = this.dictionary(this.props.dictionary);
        return (React.createElement(Flex_1.default, { onKeyDown: onKeyDown, style: style, className: className, align: "flex-start", justify: "center", dir: dir, column: true },
            React.createElement(styled_components_1.ThemeProvider, { theme: this.theme() },
                React.createElement(React.Fragment, null,
                    React.createElement(editor_1.StyledEditor, { dir: dir, rtl: isRTL, readOnly: readOnly, readOnlyWriteCheckboxes: readOnlyWriteCheckboxes, ref: ref => (this.element = ref) }),
                    !readOnly && this.view && (React.createElement(React.Fragment, null,
                        React.createElement(SelectionToolbar_1.default, { view: this.view, dictionary: dictionary, commands: this.commands, rtl: isRTL, isTemplate: this.props.template === true, onOpen: this.handleOpenSelectionMenu, onClose: this.handleCloseSelectionMenu, onSearchLink: this.props.onSearchLink, onClickLink: this.props.onClickLink, onCreateLink: this.props.onCreateLink, tooltip: tooltip }),
                        React.createElement(LinkToolbar_1.default, { view: this.view, dictionary: dictionary, isActive: this.state.linkMenuOpen, onCreateLink: this.props.onCreateLink, onSearchLink: this.props.onSearchLink, onClickLink: this.props.onClickLink, onShowToast: this.props.onShowToast, onClose: this.handleCloseLinkMenu, tooltip: tooltip }),
                        React.createElement(EmojiMenu_1.default, { view: this.view, commands: this.commands, dictionary: dictionary, rtl: isRTL, isActive: this.state.emojiMenuOpen, search: this.state.blockMenuSearch, onClose: () => this.setState({ emojiMenuOpen: false }) }),
                        React.createElement(BlockMenu_1.default, { view: this.view, commands: this.commands, dictionary: dictionary, rtl: isRTL, isActive: this.state.blockMenuOpen, search: this.state.blockMenuSearch, onClose: this.handleCloseBlockMenu, uploadImage: this.props.uploadImage, uploadFile: this.props.uploadFile, onLinkToolbarOpen: this.handleOpenLinkMenu, onImageUploadStart: this.props.onImageUploadStart, onImageUploadStop: this.props.onImageUploadStop, onFileUploadStart: this.props.onFileUploadStart, onFileUploadStop: this.props.onFileUploadStop, onShowToast: this.props.onShowToast, embeds: this.props.embeds })))))));
    }
}
RichMarkdownEditor.defaultProps = {
    defaultValue: "",
    dir: "auto",
    placeholder: "Write something nice…",
    onImageUploadStart: () => {
    },
    onImageUploadStop: () => {
    },
    onClickLink: href => {
        window.open(href, "_blank");
    },
    embeds: [],
    extensions: [],
    tooltip: Tooltip_1.default,
};
exports.default = RichMarkdownEditor;
//# sourceMappingURL=index.js.map