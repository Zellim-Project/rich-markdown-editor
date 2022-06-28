"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlaceholder = void 0;
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_view_1 = require("prosemirror-view");
const React = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const FileExtension_1 = __importDefault(require("../components/FileExtension"));
const uploadPlaceholder = new prosemirror_state_1.Plugin({
    state: {
        init() {
            return prosemirror_view_1.DecorationSet.empty;
        },
        apply(tr, set) {
            set = set.map(tr.mapping, tr.doc);
            const action = tr.getMeta(this);
            if (action?.add) {
                if (action.add.replaceExisting) {
                    const $pos = tr.doc.resolve(action.add.pos);
                    if ($pos.nodeAfter?.type.name === "image") {
                        const deco = prosemirror_view_1.Decoration.node($pos.pos, $pos.pos + $pos.nodeAfter.nodeSize, {
                            class: "image-replacement-uploading",
                        }, {
                            id: action.add.id,
                        });
                        set = set.add(tr.doc, [deco]);
                    }
                }
                else if (action.add.isImage) {
                    const element = document.createElement("div");
                    element.className = "image placeholder";
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(action.add.file);
                    element.appendChild(img);
                    const deco = prosemirror_view_1.Decoration.widget(action.add.pos, element, {
                        id: action.add.id,
                    });
                    set = set.add(tr.doc, [deco]);
                }
                else {
                    const element = document.createElement("div");
                    element.className = "attachment placeholder";
                    const icon = document.createElement("div");
                    icon.className = "icon";
                    const component = React.createElement(FileExtension_1.default, { title: action.add.file.name });
                    react_dom_1.default.render(component, icon);
                    element.appendChild(icon);
                    const text = document.createElement("span");
                    text.innerText = action.add.file.name;
                    element.appendChild(text);
                    const status = document.createElement("span");
                    status.innerText = "Uploading…";
                    status.className = "status";
                    element.appendChild(status);
                    const deco = prosemirror_view_1.Decoration.widget(action.add.pos, element, {
                        id: action.add.id,
                    });
                    set = set.add(tr.doc, [deco]);
                }
            }
            if (action?.remove) {
                set = set.remove(set.find(undefined, undefined, spec => spec.id === action.remove.id));
            }
            return set;
        },
    },
    props: {
        decorations(state) {
            return this.getState(state);
        },
    },
});
exports.default = uploadPlaceholder;
function findPlaceholder(state, id) {
    const decos = uploadPlaceholder.getState(state);
    const found = decos.find(undefined, undefined, spec => spec.id === id);
    return found.length ? [found[0].from, found[0].to] : null;
}
exports.findPlaceholder = findPlaceholder;
//# sourceMappingURL=uploadPlaceholder.js.map