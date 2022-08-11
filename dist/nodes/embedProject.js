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
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_state_1 = require("prosemirror-state");
const toggleWrap_1 = __importDefault(require("../commands/toggleWrap"));
const React = __importStar(require("react"));
const embedSimplePlaceHolder_1 = require("../lib/embedSimplePlaceHolder");
const Node_1 = __importDefault(require("./Node"));
const embedProject_1 = __importDefault(require("../rules/embedProject"));
const getLetter = (data) => {
    var _a;
    return (((_a = data === null || data === void 0 ? void 0 : data.replace(/(?<first>\w{1})(?<dirty>.*)/, (...args) => {
        const [{ first }] = args.reverse();
        return first.toUpperCase();
    })) === null || _a === void 0 ? void 0 : _a.trim()) || "");
};
class EmbedProject extends Node_1.default {
    constructor() {
        super(...arguments);
        this.component = props => {
            const { projectName, projectId, members, projectImg, projectColor, } = props.node.attrs;
            const { openAProject } = this.editor.props;
            return (React.createElement("div", { contentEditable: false, className: "embed-block", onClick: () => openAProject === null || openAProject === void 0 ? void 0 : openAProject({ projectId }) },
                projectImg && React.createElement("img", { src: projectImg, className: "embed-img" }),
                projectColor && (React.createElement("div", { className: "embed-img", style: { backgroundColor: projectColor } }, getLetter(projectName))),
                React.createElement("div", { className: "info" },
                    React.createElement("p", { className: "project-id" }, projectId),
                    React.createElement("p", { className: "title" }, projectName),
                    React.createElement("p", { className: "subtitle" },
                        members,
                        " Members"))));
        };
    }
    get name() {
        return "container_project";
    }
    get schema() {
        return {
            attrs: {
                projectImg: {
                    default: "",
                },
                projectName: {
                    default: "",
                },
                projectId: {
                    default: "",
                },
                projectColor: {
                    default: "",
                },
                members: {
                    default: "",
                },
            },
            content: "block+",
            group: "block",
            defining: true,
            draggable: false,
            parseDOM: [
                {
                    tag: "div.embed-block",
                    preserveWhitespace: "full",
                    contentElement: "div.info",
                    getAttrs: (dom) => ({
                        projectName: dom.getElementsByClassName("title")[0].textContent,
                        projectId: dom.getElementsByClassName("project-id")[0].textContent,
                        members: dom.getElementsByClassName("subtitle")[0].textContent,
                        projectImg: dom.getElementsByTagName("img")[0].src,
                        projectColor: dom.getElementsByClassName("embed-img")[0]
                            .style.background,
                    }),
                },
            ],
            toDOM: node => {
                return [
                    "div",
                    { class: "embed-block" },
                    ["p", Object.assign(Object.assign({}, node.attrs), { contentEditable: false })],
                ];
            },
        };
    }
    commands({ type }) {
        return attrs => toggleWrap_1.default(type, attrs);
    }
    get rulePlugins() {
        return [embedProject_1.default];
    }
    inputRules({ type }) {
        return [prosemirror_inputrules_1.wrappingInputRule(/^###$/, type)];
    }
    toMarkdown(state, node) {
        state.write("###");
        state.write("[" +
            "projectId-" +
            state.esc(node.attrs.projectId) +
            "]" +
            "(" +
            state.esc(node.attrs.projectName) +
            "&-&" +
            state.esc(node.attrs.members) +
            "&-&" +
            state.esc(node.attrs.projectImg) +
            "&-&" +
            state.esc(node.attrs.projectColor) +
            ")");
        state.ensureNewLine();
        state.write("###");
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "container_project",
            getAttrs: token => {
                const file_regex = /\[(?<projectId>[^]*?)\]\((?<filename>[^]*?)\)/g;
                const result = file_regex.exec(token.info);
                const [projectName, members, projectImg, projectColor] = (result === null || result === void 0 ? void 0 : result[2].split("&-&")) || [];
                const [, projectId] = (result === null || result === void 0 ? void 0 : result[1].split("-")) || [];
                return {
                    projectName: result ? projectName : null,
                    members: result ? members : null,
                    projectImg: result ? projectImg : null,
                    projectId: result ? projectId : null,
                    projectColor: result ? projectColor : null,
                };
            },
        };
    }
    get plugins() {
        return [embedSimplePlaceHolder_1.embedProjectPlaceholder, new prosemirror_state_1.Plugin({})];
    }
}
exports.default = EmbedProject;
//# sourceMappingURL=embedProject.js.map