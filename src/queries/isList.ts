/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Node, Schema } from "prosemirror-model";

export default function isList(node: Node, schema: Schema) {
  return (
    node.type === schema.nodes.bullet_list ||
    node.type === schema.nodes.ordered_list ||
    node.type === schema.nodes.checkbox_list
  );
}
