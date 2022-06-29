"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderToHtml = exports.serializer = exports.parser = exports.schema = void 0;
const prosemirror_model_1 = require("prosemirror-model");
const ExtensionManager_1 = __importDefault(require("./lib/ExtensionManager"));
const renderToHtml_1 = __importDefault(require("./lib/renderToHtml"));
const full_1 = __importDefault(require("./extensions/full"));
const extensions = new ExtensionManager_1.default(full_1.default);
exports.schema = new prosemirror_model_1.Schema({
    nodes: extensions.nodes,
    marks: extensions.marks,
});
exports.parser = extensions.parser({
    schema: exports.schema,
    plugins: extensions.rulePlugins,
});
exports.serializer = extensions.serializer();
const renderToHtml = (markdown) => (0, renderToHtml_1.default)(markdown, extensions.rulePlugins);
exports.renderToHtml = renderToHtml;
//# sourceMappingURL=server.js.map