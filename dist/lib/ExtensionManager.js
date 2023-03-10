import { keymap } from "prosemirror-keymap";
import { MarkdownParser } from "prosemirror-markdown";
import { MarkdownSerializer } from "./markdown/serializer";
import makeRules from "./markdown/rules";
import { isEmpty } from "lodash";
export default class ExtensionManager {
    constructor(extensions = [], editor) {
        if (editor) {
            extensions.forEach(extension => {
                extension.bindEditor(editor);
            });
        }
        this.extensions = extensions;
    }
    get nodes() {
        return this.extensions
            .filter(extension => extension.type === "node")
            .reduce((nodes, node) => ({
            ...nodes,
            [node.name]: node.schema
        }), {});
    }
    serializer() {
        const nodes = this.extensions
            .filter(extension => extension.type === "node")
            .reduce((nodes, extension) => ({
            ...nodes,
            [extension.name]: extension.toMarkdown
        }), {});
        const marks = this.extensions
            .filter(extension => extension.type === "mark")
            .reduce((marks, extension) => ({
            ...marks,
            [extension.name]: extension.toMarkdown
        }), {});
        return new MarkdownSerializer(nodes, marks);
    }
    parser({ schema, rules, plugins }) {
        const tokens = this.extensions
            .filter(extension => extension.type === "mark" || extension.type === "node")
            .reduce((nodes, extension) => {
            const md = extension.parseMarkdown();
            if (!md)
                return nodes;
            return {
                ...nodes,
                [extension.markdownToken || extension.name]: md
            };
        }, {});
        return new MarkdownParser(schema, makeRules({ rules, plugins }), tokens);
    }
    get marks() {
        return this.extensions
            .filter(extension => extension.type === "mark")
            .reduce((marks, { name, schema }) => ({
            ...marks,
            [name]: schema
        }), {});
    }
    get plugins() {
        return this.extensions
            .filter(extension => "plugins" in extension)
            .reduce((allPlugins, { plugins }) => [...allPlugins, ...plugins], []);
    }
    get rulePlugins() {
        return this.extensions
            .filter(extension => "rulePlugins" in extension)
            .reduce((allRulePlugins, { rulePlugins }) => [
            ...allRulePlugins,
            ...rulePlugins
        ], []);
    }
    keymaps({ schema }) {
        const keyMaps = this.extensions.reduce((acc, extension) => {
            const extensionInputRules = extension.keys?.({
                type: schema[`${extension.type}s`]?.[extension.name] || "",
                schema
            });
            if (!isEmpty(extensionInputRules))
                acc.push(extensionInputRules);
            return acc;
        }, []);
        return keyMaps.map(keys => keymap(keys));
    }
    inputRules({ schema }) {
        const inputRules = this.extensions.reduce((acc, extension) => {
            const extensionInputRules = extension.inputRules?.({
                type: schema[`${extension.type}s`]?.[extension.name] || "",
                schema
            });
            if (!isEmpty(extensionInputRules))
                acc.push(...extensionInputRules);
            return acc;
        }, []);
        return inputRules;
    }
    commands({ schema, view }) {
        return this.extensions
            .filter(extension => extension.commands)
            .reduce((allCommands, extension) => {
            const { name, type } = extension;
            const commands = {};
            const value = extension.commands({
                schema,
                ...(["node", "mark"].includes(type)
                    ? {
                        type: schema[`${type}s`][name]
                    }
                    : {})
            });
            const apply = (callback, attrs) => {
                if (!view.editable) {
                    return false;
                }
                view.focus();
                return callback(attrs)(view.state, view.dispatch, view);
            };
            const handle = (_name, _value) => {
                if (Array.isArray(_value)) {
                    commands[_name] = attrs => _value.forEach(callback => apply(callback, attrs));
                }
                else if (typeof _value === "function") {
                    commands[_name] = attrs => apply(_value, attrs);
                }
            };
            if (typeof value === "object") {
                Object.entries(value).forEach(([commandName, commandValue]) => {
                    handle(commandName, commandValue);
                });
            }
            else {
                handle(name, value);
            }
            return {
                ...allCommands,
                ...commands
            };
        }, {});
    }
}
//# sourceMappingURL=ExtensionManager.js.map