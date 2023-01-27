import customFence from "markdown-it-container";
export default function project(md) {
    return customFence(md, "project", {
        marker: "#-",
        validate: () => true,
        render: function (tokens, idx) {
            const { info } = tokens[idx];
            if (tokens[idx].nesting === 1) {
                return `<div class="project project-${md.utils.escapeHtml(info)}">\n`;
            }
            else {
                return "</div>\n";
            }
        }
    });
}
//# sourceMappingURL=embedProject.js.map