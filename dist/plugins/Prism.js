import refractor from "refractor/core";
import flattenDeep from "lodash/flattenDeep";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { findBlockNodes } from "prosemirror-utils";
export const LANGUAGES = {
    none: "None",
    bash: "Bash",
    css: "CSS",
    clike: "C",
    csharp: "C#",
    go: "Go",
    markup: "HTML",
    objectivec: "Objective-C",
    java: "Java",
    javascript: "JavaScript",
    json: "JSON",
    perl: "Perl",
    php: "PHP",
    powershell: "Powershell",
    python: "Python",
    ruby: "Ruby",
    rust: "Rust",
    sql: "SQL",
    typescript: "TypeScript",
    yaml: "YAML",
};
const cache = {};
function getDecorations({ doc, name }) {
    const decorations = [];
    const blocks = findBlockNodes(doc).filter(item => item.node.type.name === name);
    function parseNodes(nodes, classNames = []) {
        return nodes.map(node => {
            if (node.type === "element") {
                const classes = [...classNames, ...(node.properties.className || [])];
                return parseNodes(node.children, classes);
            }
            return {
                text: node.value,
                classes: classNames,
            };
        });
    }
    blocks.forEach(block => {
        let startPos = block.pos + 1;
        const language = block.node.attrs.language;
        if (!language || language === "none" || !refractor.registered(language)) {
            return;
        }
        if (!cache[block.pos] || !cache[block.pos].node.eq(block.node)) {
            const nodes = refractor.highlight(block.node.textContent, language);
            const _decorations = flattenDeep(parseNodes(nodes))
                .map((node) => {
                const from = startPos;
                const to = from + node.text.length;
                startPos = to;
                return {
                    ...node,
                    from,
                    to,
                };
            })
                .filter(node => node.classes && node.classes.length)
                .map(node => Decoration.inline(node.from, node.to, {
                class: node.classes.join(" "),
            }));
            cache[block.pos] = {
                node: block.node,
                decorations: _decorations,
            };
        }
        cache[block.pos].decorations.forEach(decoration => {
            decorations.push(decoration);
        });
    });
    Object.keys(cache)
        .filter(pos => !blocks.find(block => block.pos === Number(pos)))
        .forEach(pos => {
        delete cache[Number(pos)];
    });
    return DecorationSet.create(doc, decorations);
}
export default function Prism({ name }) {
    let highlighted = false;
    return new Plugin({
        key: new PluginKey("prism"),
        state: {
            init: (_, { doc }) => {
                return DecorationSet.create(doc, []);
            },
            apply: (transaction, decorationSet, oldState, state) => {
                const nodeName = state.selection.$head.parent.type.name;
                const previousNodeName = oldState.selection.$head.parent.type.name;
                const codeBlockChanged = transaction.docChanged && [nodeName, previousNodeName].includes(name);
                const ySyncEdit = !!transaction.getMeta("y-sync$");
                if (!highlighted || codeBlockChanged || ySyncEdit) {
                    highlighted = true;
                    return getDecorations({ doc: transaction.doc, name });
                }
                return decorationSet.map(transaction.mapping, transaction.doc);
            },
        },
        view: view => {
            if (!highlighted) {
                setTimeout(() => {
                    view.dispatch(view.state.tr.setMeta("prism", { loaded: true }));
                }, 10);
            }
            return {};
        },
        props: {
            decorations(state) {
                return this.getState(state);
            },
        },
    });
}
//# sourceMappingURL=Prism.js.map