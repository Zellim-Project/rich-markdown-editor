import customFence from "markdown-it-container";
export default function mentionDocument(md) {
    return customFence(md, "mentionDocument", {
        marker: "(-",
        validate: () => true,
        render: function (tokens, idx) {
            const { info } = tokens[idx];
            if (tokens[idx].nesting === 1) {
                return `<div class="mentionDocument mentionDocument-${md.utils.escapeHtml(info)}">\n`;
            }
            else {
                return "</div>\n";
            }
        }
    });
}
//# sourceMappingURL=mentionDocument.js.map