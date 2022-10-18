import { linkDocumentPlaceholder, findPlaceholder } from "../lib/embedSimplePlaceHolder";
import { ToastType } from "../types";
const linkDocument = function (view, event, pos, options) {
    const { dictionary, linkDocument, onShowToast } = options;
    if (!linkDocument) {
        console.warn("linkDocument callback must be defined to handle mention a Docuemnt.");
        return;
    }
    event.preventDefault();
    const { schema } = view.state;
    const id = `linkDocument`;
    const { tr } = view.state;
    tr.setMeta(linkDocumentPlaceholder, {
        add: {
            id,
            pos
        }
    });
    view.dispatch(tr);
    linkDocument()
        .then(({ docId, docName, icon }) => {
        const pos = findPlaceholder(view.state, id, "linkDocument");
        if (pos === null)
            return;
        const transaction = view.state.tr
            .replaceWith(pos, pos, schema.nodes.link_doc.create({ docId, docName, icon }))
            .setMeta(linkDocumentPlaceholder, { remove: { id } });
        view.dispatch(transaction);
    })
        .catch(error => {
        console.error(error);
        const transaction = view.state.tr.setMeta(linkDocumentPlaceholder, {
            remove: { id }
        });
        view.dispatch(transaction);
        if (onShowToast) {
            onShowToast(dictionary.imageUploadError, ToastType.Error);
        }
    });
};
export default linkDocument;
//# sourceMappingURL=linkDocument.js.map