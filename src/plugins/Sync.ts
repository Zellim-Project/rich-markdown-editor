import { ySyncPlugin, yCursorPlugin } from "y-prosemirror";
import Extension from "../lib/Extension";

export default class Sync extends Extension {
  get name() {
    return "sync";
  }

  get plugins() {
    return [
      ySyncPlugin(this.options.yXmlFragment),
      yCursorPlugin(this.options.yProvider.awareness),
    ];
  }
}
