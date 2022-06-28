import { PluginSimple } from "markdown-it";
import createMarkdown from "../lib/markdown/rules";
import attachmentsRule from "../rules/attachments";
import breakRule from "../rules/breaks";
import checkboxRule from "../rules/checkboxes";
import embedsRule from "../rules/embeds";
import emojiRule from "../rules/emoji";
import markRule from "../rules/mark";
import noticesRule from "../rules/notices";
import tablesRule from "../rules/tables";
import underlinesRule from "../rules/underlines";

const defaultRules = [
  embedsRule([]),
  breakRule,
  checkboxRule,
  markRule({ delim: "==", mark: "highlight" }),
  markRule({ delim: "!!", mark: "placeholder" }),
  underlinesRule,
  tablesRule,
  noticesRule,
  attachmentsRule,
  emojiRule,
];

export default function renderToHtml(
  markdown: string,
  rulePlugins: PluginSimple[] = defaultRules
): string {
  return createMarkdown({ plugins: rulePlugins })
    .render(markdown)
    .trim();
}
