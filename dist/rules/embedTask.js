"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_it_container_1 = __importDefault(require("markdown-it-container"));
function task(md) {
    return markdown_it_container_1.default(md, "task", {
        marker: "&",
        validate: () => true,
        render: function (tokens, idx) {
            const { info } = tokens[idx];
            console.log(info);
            if (tokens[idx].nesting === 1) {
                return `<div class="task task-${md.utils.escapeHtml(info)}">\n`;
            }
            else {
                return "</div>\n";
            }
        },
    });
}
exports.default = task;
//# sourceMappingURL=embedTask.js.map