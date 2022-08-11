import { wrappingInputRule } from "prosemirror-inputrules";
import { Plugin } from "prosemirror-state";
import toggleWrap from "../commands/toggleWrap";
import * as React from "react";
import { embedProjectPlaceholder } from "../lib/embedSimplePlaceHolder";
import Node from "./Node";
import projectRules from "../rules/embedProject";

const getLetter = (data): string => {
  return (
    data
      ?.replace(/(?<first>\w{1})(?<dirty>.*)/, (...args) => {
        const [{ first }] = args.reverse();
        return first.toUpperCase();
      })
      ?.trim() || ""
  );
};

export default class EmbedProject extends Node {
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
          getAttrs: (dom: HTMLDivElement) => ({
            projectName: dom.getElementsByClassName("title")[0].textContent,
            projectId: dom.getElementsByClassName("project-id")[0].textContent,
            members: dom.getElementsByClassName("subtitle")[0].textContent,
            projectImg: dom.getElementsByTagName("img")[0].src,
            projectColor: (dom.getElementsByClassName("embed-img")[0] as any)
              .style.background,
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
    const {
      projectName,
      projectId,
      members,
      projectImg,
      projectColor,
    } = props.node.attrs;
    const { openAProject } = this.editor.props;
    return (
      <div
        contentEditable={false}
        className="embed-block"
        onClick={() => openAProject?.({ projectId })}
      >
        {projectImg && <img src={projectImg} className="embed-img"></img>}
        {projectColor && (
          <div className="embed-img" style={{ backgroundColor: projectColor }}>
            {getLetter(projectName)}
          </div>
        )}
        <div className="info">
          <p className="project-id">{projectId}</p>
          <p className="title">{projectName}</p>
          <p className="subtitle">{members} Members</p>
        </div>
      </div>
    );
  };

  commands({ type }) {
    return attrs => toggleWrap(type, attrs);
  }

  get rulePlugins() {
    return [projectRules];
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^###$/, type)];
  }

  toMarkdown(state, node) {
    state.write("###");
    state.write(
      "[" +
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
        ")"
    );
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
        const [projectName, members, projectImg, projectColor] =
          result?.[2].split("&-&") || [];
        const [, projectId] = result?.[1].split("-") || [];
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
    return [embedProjectPlaceholder, new Plugin({})];
  }
}
