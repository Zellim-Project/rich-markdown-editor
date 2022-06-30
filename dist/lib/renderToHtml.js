"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rules_1 = __importDefault(require("../lib/markdown/rules"));
const attachments_1 = __importDefault(require("../rules/attachments"));
const breaks_1 = __importDefault(require("../rules/breaks"));
const checkboxes_1 = __importDefault(require("../rules/checkboxes"));
const embeds_1 = __importDefault(require("../rules/embeds"));
const emoji_1 = __importDefault(require("../rules/emoji"));
const mark_1 = __importDefault(require("../rules/mark"));
const notices_1 = __importDefault(require("../rules/notices"));
const tables_1 = __importDefault(require("../rules/tables"));
const underlines_1 = __importDefault(require("../rules/underlines"));
const defaultRules = [
    (0, embeds_1.default)([]),
    breaks_1.default,
    checkboxes_1.default,
    (0, mark_1.default)({ delim: "==", mark: "highlight" }),
    (0, mark_1.default)({ delim: "!!", mark: "placeholder" }),
    underlines_1.default,
    tables_1.default,
    notices_1.default,
    attachments_1.default,
    emoji_1.default,
];
function renderToHtml(markdown, rulePlugins = defaultRules) {
    return (0, rules_1.default)({ plugins: rulePlugins })
        .render(markdown)
        .trim();
}
exports.default = renderToHtml;
//# sourceMappingURL=renderToHtml.js.map