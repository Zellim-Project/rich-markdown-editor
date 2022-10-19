import customFence from "markdown-it-container";
export default function linkDocument(md) {
    return customFence(md, "linkDocument", {
        marker: ")-",
        validate: () => true,
        render: function (tokens, idx) {
            const { info } = tokens[idx];
            if (tokens[idx].nesting === 1) {
                return `<div class="linkDocument linkDocument-${md.utils.escapeHtml(info)}">\n`;
            }
            else {
                return "</div>\n";
            }
        }
    });
}
//# sourceMappingURL=linkDocument.js.map