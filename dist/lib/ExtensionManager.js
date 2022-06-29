"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_keymap_1 = require("prosemirror-keymap");
const prosemirror_markdown_1 = require("prosemirror-markdown");
const rules_1 = __importDefault(require("./markdown/rules"));
const serializer_1 = require("./markdown/serializer");
class ExtensionManager {
    constructor(extensions = [], editor) {
        this.extensions = [];
        extensions.forEach((ext) => {
            let extension;
            if (typeof ext === "function") {
                extension = new ext(editor?.props);
            }
            else {
                extension = ext;
            }
            if (editor) {
                extension.bindEditor(editor);
            }
            this.extensions.push(extension);
        });
    }
    get nodes() {
        return this.extensions
            .filter(extension => extension.type === "node")
            .reduce((nodes, node) => ({
            ...nodes,
            [node.name]: node.schema,
        }), {});
    }
    serializer() {
        const nodes = this.extensions
            .filter(extension => extension.type === "node")
            .reduce((nodes, extension) => ({
            ...nodes,
            [extension.name]: extension.toMarkdown,
        }), {});
        const marks = this.extensions
            .filter(extension => extension.type === "mark")
            .reduce((marks, extension) => ({
            ...marks,
            [extension.name]: extension.toMarkdown,
        }), {});
        return new serializer_1.MarkdownSerializer(nodes, marks);
    }
    parser({ schema, rules, plugins, }) {
        const tokens = this.extensions
            .filter(extension => extension.type === "mark" || extension.type === "node")
            .reduce((nodes, extension) => {
            const md = extension.parseMarkdown();
            if (!md) {
                return nodes;
            }
            return {
                ...nodes,
                [extension.markdownToken || extension.name]: md,
            };
        }, {});
        return new prosemirror_markdown_1.MarkdownParser(schema, (0, rules_1.default)({ rules, plugins }), tokens);
    }
    get marks() {
        return this.extensions
            .filter(extension => extension.type === "mark")
            .reduce((marks, { name, schema }) => ({
            ...marks,
            [name]: schema,
        }), {});
    }
    get plugins() {
        return this.extensions.reduce((allPlugins, extension) => {
            if ("plugins" in extension) {
                console.log({ plugins: extension.plugins });
                return [...allPlugins, ...extension.plugins];
            }
            return allPlugins;
        }, []);
    }
    get rulePlugins() {
        return this.extensions
            .filter(extension => "rulePlugins" in extension)
            .reduce((allRulePlugins, { rulePlugins }) => [
            ...allRulePlugins,
            ...rulePlugins,
        ], []);
    }
    keymaps({ schema }) {
        const keymaps = this.extensions
            .filter(extension => extension.keys)
            .map(extension => ["node", "mark"].includes(extension.type)
            ? extension.keys({
                type: schema[`${extension.type}s`][extension.name],
                schema,
            })
            : extension.keys({ schema }));
        return keymaps.map(prosemirror_keymap_1.keymap);
    }
    inputRules({ schema }) {
        const extensionInputRules = this.extensions
            .filter(extension => ["extension"].includes(extension.type))
            .filter(extension => extension.inputRules)
            .map((extension) => extension.inputRules({ schema }));
        const nodeMarkInputRules = this.extensions
            .filter(extension => ["node", "mark"].includes(extension.type))
            .filter(extension => extension.inputRules)
            .map(extension => extension.inputRules({
            type: schema[`${extension.type}s`][extension.name],
            schema,
        }));
        return [...extensionInputRules, ...nodeMarkInputRules].reduce((allInputRules, inputRules) => [...allInputRules, ...inputRules], []);
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
                        type: schema[`${type}s`][name],
                    }
                    : {}),
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
                    commands[_name] = (attrs) => _value.forEach(callback => apply(callback, attrs));
                }
                else if (typeof _value === "function") {
                    commands[_name] = (attrs) => apply(_value, attrs);
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
                ...commands,
            };
        }, {});
    }
}
exports.default = ExtensionManager;
//# sourceMappingURL=ExtensionManager.js.map