import customFence from "markdown-it-container";
export default function task(md) {
    return customFence(md, "task", {
        marker: "&",
        validate: () => true,
        render: function (tokens, idx) {
            const { info } = tokens[idx];
            if (tokens[idx].nesting === 1) {
                return `<div class="task task-${md.utils.escapeHtml(info)}">\n`;
            }
            else {
                return "</div>\n";
            }
        },
    });
}
//# sourceMappingURL=embedTask.js.map