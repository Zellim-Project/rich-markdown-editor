import { mentionDocumentPlaceholder, findPlaceholder } from "../lib/embedSimplePlaceHolder";
import { ToastType } from "../types";
const mentionDocument = function (view, event, pos, options) {
    const { dictionary, mentionDocument, onShowToast } = options;
    if (!mentionDocument) {
        console.warn("mentionDocument callback must be defined to handle mention a Docuemnt.");
        return;
    }
    event.preventDefault();
    const { schema } = view.state;
    const id = `mentionDocument`;
    const { tr } = view.state;
    tr.setMeta(mentionDocumentPlaceholder, {
        add: {
            id,
            pos
        }
    });
    view.dispatch(tr);
    mentionDocument()
        .then(({ docId, docName, icon }) => {
        const pos = findPlaceholder(view.state, id, "mentionDocument");
        if (pos === null)
            return;
        const transaction = view.state.tr
            .replaceWith(pos, pos, schema.nodes.mention_doc.create({ docId, docName, icon }))
            .setMeta(mentionDocumentPlaceholder, { remove: { id } });
        view.dispatch(transaction);
    })
        .catch(error => {
        console.error(error);
        const transaction = view.state.tr.setMeta(mentionDocumentPlaceholder, {
            remove: { id }
        });
        view.dispatch(transaction);
        if (onShowToast) {
            onShowToast(dictionary.imageUploadError, ToastType.Error);
        }
    });
};
export default mentionDocument;
//# sourceMappingURL=mentionDocument.js.map