import customFence from "markdown-it-container";
export default function file(md) {
    return customFence(md, "file", {
        marker: "@",
        validate: () => true,
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
//# sourceMappingURL=files.js.map