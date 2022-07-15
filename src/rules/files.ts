import customFence from "markdown-it-container";

export default function file(md): void {
  return customFence(md, "file", {
    validate: params => {
      console.log(params);
      return params.trim.match(/@@@\[(?<alt>[^]*?)\]\((?<filename>[^]*?)\)/);
    },
    render: function(tokens, idx) {
      const { info } = tokens[idx];
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="file file-${md.utils.escapeHtml(info)}">\n`;
      } else {
        // closing tag
        return "</div>\n";
      }
    },
  });
}
