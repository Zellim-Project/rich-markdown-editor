import customFence from "markdown-it-container";
export default function linkDocument(md) {
    return customFence(md, "link_doc", {
        marker: "$-",
        validate: () => true,
        render: function (tokens, idx) {
            const { info } = tokens[idx];
            if (tokens[idx].nesting === 1) {
                return `<div class="link_doc link_doc-${md.utils.escapeHtml(info)}">\n`;
            }
            else {
                return "</div>\n";
            }
        }
    });
}
//# sourceMappingURL=linkDocument.js.map