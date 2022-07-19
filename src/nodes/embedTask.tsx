import { wrappingInputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import { Union } from "../lib/icons";
import * as React from "react";
import ReactDOM from "react-dom";
import embedTaskPlaceHolder from "../lib/embedTaskPlaceHolder";
import Node from "./Node";
import taskRUles from "../rules/embedTask";
export default class EmbedTask extends Node {
  get name() {
    return "container_task";
  }

  get schema() {
    return {
      attrs: {
        id: {
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
          tag: "div.task-block",
          preserveWhitespace: "full",
          contentElement: "div.info",
          getAttrs: (dom: HTMLDivElement) => ({
            taskName: dom.getElementsByClassName("title")[0].textContent,
            id: dom.getElementsByClassName("task-id")[0].textContent,
            projectName: dom.getElementsByClassName("subtitle")[0].textContent,
          }),
        },
      ],
      toDOM: node => {
        return [
          "div",
          { class: "task-block" },
          ["p", { ...node.attrs, contentEditable: false }],
        ];
      },
    };
  }

  component = props => {
    const { id, taskName, projectName } = props.node.attrs;
    const { openATask } = this.editor.props;

    return (
      <div
        contentEditable={false}
        className="task-block"
        onClick={() => openATask?.(id)}
      >
        <div className="icon">
          <Union />
        </div>
        <div className="info">
          <p className="task-id">{id}</p>
          <p className="title">{taskName}</p>
          <p className="subtitle">{projectName}</p>
        </div>
      </div>
    );
  };

  commands({ type }) {
    return attrs => toggleWrap(type, attrs);
  }

  /* inputRules({ type }) {
    return [
      new InputRule(EMBED_TASK_REGEX, (state, match, start, end) => {
        const [okay, taskName, projectName] = match;
        const { tr } = state;
        console.log(okay, match);
        if (okay) {
          tr.replaceWith(
            start - 1,
            end,
            type.create({
              taskName,
              projectName,
            })
          );
        }

        return tr;
      }),
    ];
  } */
  get rulePlugins() {
    return [taskRUles];
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^&&&$/, type)];
  }

  toMarkdown(state, node) {
    state.write("&&&");
    state.write(
      "[" +
        "taskId-" +
        state.esc(node.attrs.id) +
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
        const file_regex = /\[(?<id>[^]*?)\]\((?<filename>[^]*?)\)/g;
        const result = file_regex.exec(token.info);
        const [taskName, projectName] = result?.[2].split("&-&") || [];
        console.log({ taskName, projectName });
        return {
          projectName: result ? taskName : null,
          taskName: result ? projectName : null,
          id: result ? result[1] : null,
        };
      },
    };
  }

  get plugins() {
    return [embedTaskPlaceHolder, new Plugin({})];
  }
}
