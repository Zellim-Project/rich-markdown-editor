import customFence from "markdown-it-container";

export default function linkDocument(md): void {
  return customFence(md, "linkDocument", {
    marker: ")-",
    validate: () => true,
    render: function(tokens, idx) {
      const { info } = tokens[idx];
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="linkDocument linkDocument-${md.utils.escapeHtml(
          info
        )}">\n`;
      } else {
        // closing tag
        return "</div>\n";
      }
    }
  });
}
