import { wrappingInputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import { Union } from "../lib/icons";
import * as React from "react";
import { embedTaskPlaceholder } from "../lib/embedSimplePlaceHolder";
import Node from "./Node";
import taskRules from "../rules/embedTask";
export default class EmbedTask extends Node {
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
          getAttrs: (dom: HTMLDivElement) => ({
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
          ["p", { ...node.attrs, contentEditable: false }],
        ];
      },
    };
  }

  component = props => {
    const { taskId, projectId, taskName, projectName } = props.node.attrs;
    const { openATask } = this.editor.props;
    return (
      <div
        contentEditable={false}
        className="embed-block"
        onClick={() => openATask?.({ taskId, projectId })}
      >
        <div className="icon">
          <Union />
        </div>
        <div className="info">
          <p className="task-id">{taskId}</p>
          <p className="project-id">{projectId}</p>
          <p className="title">{taskName}</p>
          <p className="subtitle">{projectName}</p>
        </div>
      </div>
    );
  };

  commands({ type }) {
    return attrs => toggleWrap(type, attrs);
  }

  get rulePlugins() {
    return [taskRules];
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^&&&$/, type)];
  }

  toMarkdown(state, node) {
    state.ensureNewLine();
    state.write("\\\\");
    state.ensureNewLine();
    state.write("&&&");
    state.write(
      "[" +
        "taskId-" +
        state.esc(node.attrs.taskId) +
        "-" +
        state.esc(node.attrs.projectId) +
        "]" +
        "(" +
        state.esc(node.attrs.taskName) +
        "&-&" +
        state.esc(node.attrs.projectName) +
        ")"
    );
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
        const [taskName, projectName] = result?.[2].split("&-&") || [];
        const [, taskId, projectId] = result?.[1].split("-") || [];
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
    return [embedTaskPlaceholder, new Plugin({})];
  }
}
