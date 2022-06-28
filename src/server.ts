import { Schema } from "prosemirror-model";
import ExtensionManager from "./lib/ExtensionManager";
import render from "./lib/renderToHtml";
import fullPackage from "./extensions/full";

const extensions = new ExtensionManager(fullPackage as any);

export const schema = new Schema({
  nodes: extensions.nodes,
  marks: extensions.marks,
});

export const parser = extensions.parser({
  schema,
  plugins: extensions.rulePlugins,
});

export const serializer = extensions.serializer();

export const renderToHtml = (markdown: string): string =>
  render(markdown, extensions.rulePlugins);
