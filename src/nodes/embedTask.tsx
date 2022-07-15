import { InputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import { Union } from "../lib/icons";
import * as React from "react";
import ReactDOM from "react-dom";
import embedTaskPlaceHolder from "../lib/embedTaskPlaceHolder";
import Node from "./Node";

const EMBED_TASK_REGEX = /!!\[(?<alt>[^]*?)\]\((?<filename>[^]*?)\)$/;
export default class EmbedTask extends Node {
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
          getAttrs: (dom: HTMLDivElement) => ({
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

        const component = <Union />;

        const icon = document.createElement("div");
        icon.className = "icon";
        ReactDOM.render(component, icon);

        const info = document.createElement("div");
        info.className = "info";
        info.appendChild(title);
        info.appendChild(subTitle);

        return ["div", { class: `embed-task` }, icon, info];
      },
    };
  }

  commands({ type }) {
    return attrs => toggleWrap(type, attrs);
  }

  inputRules({ type }) {
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
  }

  toMarkdown(state, node) {
    state.write(
      "!![" +
        state.esc(node.attrs.taskName) +
        "]" +
        "(" +
        state.esc(node.attrs.projectName) +
        ")"
    );
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
    return [embedTaskPlaceHolder, new Plugin({})];
  }
}
