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
    const { openATask } = this.editor.props;
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
            projectName: dom.getElementsByClassName("subtitle")[0].textContent,
          }),
        },
      ],
      toDOM: node => {
        const container = document.createElement("div");
        container.className = "task-block";
        container.addEventListener("click", () => openATask?.(node.attrs.id));

        const title = document.createElement("p");
        title.className = "title";
        const taskName = document.createTextNode(node.attrs.taskName);
        title.appendChild(taskName);

        const subTitle = document.createElement("p");
        subTitle.className = "subtitle";
        const projectName = document.createTextNode(node.attrs.projectName);
        subTitle.appendChild(projectName);

        const component = <Union />;

        const icon = document.createElement("div");
        icon.className = "icon";
        ReactDOM.render(component, icon);

        const info = document.createElement("div");
        info.className = "info";
        info.appendChild(title);
        info.appendChild(subTitle);

        return [container, icon, info];
      },
    };
  }

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
