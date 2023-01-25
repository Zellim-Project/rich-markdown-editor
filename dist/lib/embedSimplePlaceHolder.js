import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
const placeHolder = {
    state: {
        init() {
            return DecorationSet.empty;
        },
        apply(tr, set) {
            set = set.map(tr.mapping, tr.doc);
            const action = tr.getMeta(this);
            if (action && action.add) {
                const element = document.createElement("div");
                const deco = Decoration.widget(action.add.pos, element, {
                    id: action.add.id
                });
                set = set.add(tr.doc, [deco]);
            }
            else if (action && action.remove) {
                set = set.remove(set.find(null, null, spec => spec.id === action.remove.id));
            }
            return set;
        }
    },
    props: {
        decorations(state) {
            return this.getState(state);
        }
    }
};
export const embedTaskPlaceholder = new Plugin(placeHolder);
export const embedProjectPlaceholder = new Plugin(placeHolder);
export const mentionDocumentPlaceholder = new Plugin(placeHolder);
export const linkDocumentPlaceholder = new Plugin(placeHolder);
const placeholders = {
    task: embedTaskPlaceholder,
    project: embedProjectPlaceholder,
    mentionDocument: mentionDocumentPlaceholder,
    linkDocument: linkDocumentPlaceholder
};
export function findPlaceholder(state, id, type) {
    const decos = placeholders[type].getState(state);
    const found = decos.find(null, null, spec => spec.id === id);
    return found.length ? found[0].from : null;
}
//# sourceMappingURL=embedSimplePlaceHolder.js.map