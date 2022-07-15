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
const react_dom_1 = __importDefault(require("react-dom"));
const embedTaskPlaceHolder_1 = __importDefault(require("../lib/embedTaskPlaceHolder"));
const Node_1 = __importDefault(require("./Node"));
const EMBED_TASK_REGEX = /!!\[(?<alt>[^\]\[]*?)]\((?<filename>[^\]\[]*?)(?=\“|\))\“?(?<layoutclass>[^\]\[\”]+)?\”?\)$/;
class EmbedTask extends Node_1.default {
    get name() {
        return "embed_task";
    }
    get schema() {
        return {
            attrs: {
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
                    tag: "div.embed-task",
                    preserveWhitespace: "full",
                    contentElement: "div.info",
                    getAttrs: (dom) => ({
                        taskName: dom.getElementsByClassName("title")[0].textContent,
                        projectName: dom.getElementsByClassName("subtitle")[0].textContent,
                    }),
                },
            ],
            toDOM: node => {
                const title = document.createElement("p");
                title.className = "title";
                const taskName = document.createTextNode(node.attrs.taskName);
                title.appendChild(taskName);
                const subTitle = document.createElement("p");
                subTitle.className = "subtitle";
                const projectName = document.createTextNode(node.attrs.projectName);
                subTitle.appendChild(projectName);
                const component = React.createElement(icons_1.Union, null);
                const icon = document.createElement("div");
                icon.className = "icon";
                react_dom_1.default.render(component, icon);
                const info = document.createElement("div");
                info.className = "info";
                info.appendChild(title);
                info.appendChild(subTitle);
                return ["div", { class: `embed-task` }, icon, info];
            },
        };
    }
    commands({ type }) {
        return attrs => toggleWrap_1.default(type, attrs);
    }
    inputRules({ type }) {
        return [
            new prosemirror_inputrules_1.InputRule(EMBED_TASK_REGEX, (state, match, start, end) => {
                const [okay, taskName, projectName] = match;
                const { tr } = state;
                console.log(okay, match);
                if (okay) {
                    tr.replaceWith(start - 1, end, type.create({
                        taskName,
                        projectName,
                    }));
                }
                return tr;
            }),
        ];
    }
    toMarkdown(state, node) {
        state.write("!![" +
            state.esc(node.attrs.taskName) +
            "]" +
            "(" +
            state.esc(node.attrs.projectName) +
            ")");
        state.ensureNewLine();
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "embed_task",
            getAttrs: token => {
                console.log(token);
                return {
                    taskName: token.attrGet("taskName"),
                    projectName: token.attrGet("projectName"),
                };
            },
        };
    }
    get plugins() {
        return [embedTaskPlaceHolder_1.default, new prosemirror_state_1.Plugin({})];
    }
}
exports.default = EmbedTask;
//# sourceMappingURL=embedTask.js.map