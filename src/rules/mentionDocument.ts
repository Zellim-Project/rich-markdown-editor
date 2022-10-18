import customFence from "markdown-it-container";

export default function mentionDocument(md): void {
  return customFence(md, "mentionDocument", {
    marker: "(-",
    validate: () => true,
    render: function(tokens, idx) {
      const { info } = tokens[idx];
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="mentionDocument mentionDocument-${md.utils.escapeHtml(
          info
        )}">\n`;
      } else {
        // closing tag
        return "</div>\n";
      }
    }
  });
}
