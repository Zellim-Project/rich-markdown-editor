import customFence from "markdown-it-container";

export default function image(md): void {
  return customFence(md, "image", {
    marker: "&-",
    validate: () => true,
    render: function(tokens, idx) {
      const { info } = tokens[idx];
      console.log(md.utils.escapeHtml(info), "image");
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="image image-${md.utils.escapeHtml(info)}">\n`;
      } else {
        // closing tag
        return "</div>\n";
      }
    }
  });
}
