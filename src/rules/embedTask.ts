import customFence from "markdown-it-container";

export default function task(md): void {
  return customFence(md, "task", {
    marker: "&",
    validate: () => true,
    render: function(tokens, idx) {
      const { info } = tokens[idx];
      console.log({ info });
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="task task-${md.utils.escapeHtml(info)}">\n`;
      } else {
        // closing tag
        return "</div>\n";
      }
    },
  });
}
