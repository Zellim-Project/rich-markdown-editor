import Node from "./Node";
import breakRule from "../rules/breaks";
import { chainCommands, exitCode } from "prosemirror-commands";
import { isInTable } from "prosemirror-tables";
const mac = typeof navigator !== "undefined"
    ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
    : false;
export default class HardBreak extends Node {
    get name() {
        return "br";
    }
    get schema() {
        return {
            inline: true,
            group: "inline",
            selectable: false,
            parseDOM: [{ tag: "br" }],
            toDOM() {
                return ["br"];
            }
        };
    }
    get rulePlugins() {
        return [breakRule];
    }
    commands({ type }) {
        return () => (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
            return true;
        };
    }
    keys({ type }) {
        const cmd = chainCommands(exitCode, (state, dispatch) => {
            if (!isInTable(state))
                return false;
            if (dispatch)
                dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
            return true;
        });
        const commands = {
            "Shift-Enter": cmd
        };
        if (mac)
            commands["Ctrl-Enter"] = cmd;
        return commands;
    }
    toMarkdown(state) {
        state.write(" \\n ");
    }
    parseMarkdown() {
        return { node: "br" };
    }
}
//# sourceMappingURL=HardBreak.js.map