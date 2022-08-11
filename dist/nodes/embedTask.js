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
const icons_1 = require("../lib/icons");
const React = __importStar(require("react"));
const embedSimplePlaceHolder_1 = __importDefault(require("../lib/embedSimplePlaceHolder"));
const Node_1 = __importDefault(require("./Node"));
const embedTask_1 = __importDefault(require("../rules/embedTask"));
class EmbedTask extends Node_1.default {
    constructor() {
        super(...arguments);
        this.component = props => {
            const { taskId, projectId, taskName, projectName } = props.node.attrs;
            const { openATask } = this.editor.props;
            return (React.createElement("div", { contentEditable: false, className: "embed-block", onClick: () => openATask === null || openATask === void 0 ? void 0 : openATask({ taskId, projectId }) },
                React.createElement("div", { className: "icon" },
                    React.createElement(icons_1.Union, null)),
                React.createElement("div", { className: "info" },
                    React.createElement("p", { className: "task-id" }, taskId),
                    React.createElement("p", { className: "project-id" }, projectId),
                    React.createElement("p", { className: "title" }, taskName),
                    React.createElement("p", { className: "subtitle" }, projectName))));
        };
    }
    get name() {
        return "container_task";
    }
    get schema() {
        return {
            attrs: {
                taskId: {
                    default: "",
                },
                projectId: {
                    default: "",
                },
                taskName: {
                    default: "",
                },
                projectName: {
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
                        taskName: dom.getElementsByClassName("title")[0].textContent,
                        taskId: dom.getElementsByClassName("task-id")[0].textContent,
                        projectId: dom.getElementsByClassName("project-id")[0].textContent,
                        projectName: dom.getElementsByClassName("subtitle")[0].textContent,
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
        return [embedTask_1.default];
    }
    inputRules({ type }) {
        return [prosemirror_inputrules_1.wrappingInputRule(/^&&&$/, type)];
    }
    toMarkdown(state, node) {
        state.write("&&&");
        state.write("[" +
            "taskId-" +
            state.esc(node.attrs.taskId) +
            state.esc(node.attrs.projectId) +
            "]" +
            "(" +
            state.esc(node.attrs.taskName) +
            "&-&" +
            state.esc(node.attrs.projectName) +
            ")");
        state.ensureNewLine();
        state.write("&&&");
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "container_task",
            getAttrs: token => {
                const file_regex = /\[(?<taskId>[^]*?)\]\((?<filename>[^]*?)\)/g;
                const result = file_regex.exec(token.info);
                const [taskName, projectName] = (result === null || result === void 0 ? void 0 : result[2].split("&-&")) || [];
                const [, taskId, projectId] = (result === null || result === void 0 ? void 0 : result[1].split("-")) || [];
                return {
                    projectName: result ? projectName : null,
                    taskName: result ? taskName : null,
                    taskId: result ? taskId : null,
                    projectId: result ? projectId : null,
                };
            },
        };
    }
    get plugins() {
        return [embedSimplePlaceHolder_1.default, new prosemirror_state_1.Plugin({})];
    }
}
exports.default = EmbedTask;
//# sourceMappingURL=embedTask.js.map