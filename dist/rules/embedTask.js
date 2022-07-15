"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_it_container_1 = __importDefault(require("markdown-it-container"));
function file(md) {
    return markdown_it_container_1.default(md, "task", {
        validate: params => params.trim().match(/^\$\$\$task+(.*)$/),
        render: function (tokens, idx) {
            const { info } = tokens[idx];
            if (tokens[idx].nesting === 1) {
                return `<div class="file file-${md.utils.escapeHtml(info)}">\n`;
            }
            else {
                return "</div>\n";
            }
        },
    });
}
exports.default = file;
//# sourceMappingURL=embedTask.js.map