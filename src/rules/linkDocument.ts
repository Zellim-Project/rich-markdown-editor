import customFence from "markdown-it-container";

export default function linkDocument(md): void {
  return customFence(md, "link_doc", {
    marker: "$-",
    validate: () => true,
    render: function(tokens, idx) {
      const { info } = tokens[idx];
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="link_doc link_doc-${md.utils.escapeHtml(info)}">\n`;
      } else {
        // closing tag
        return "</div>\n";
      }
    }
  });
}
