import uploadFilePlaceholderPlugin, { findPlaceholder, } from "../lib/uploadFilePlaceholder";
import { ToastType } from "../types";
const insertAllFiles = function (view, event, pos, files, options) {
    if (files.length === 0)
        return;
    const { dictionary, uploadFile, onFileUploadStart, onFileUploadStop, onShowToast, } = options;
    if (!uploadFile) {
        console.warn("uploadFile callback must be defined to handle file uploads.");
        return;
    }
    event.preventDefault();
    if (onFileUploadStart)
        onFileUploadStart();
    const { schema } = view.state;
    let complete = 0;
    for (const file of files) {
        const id = {};
        const { tr } = view.state;
        tr.setMeta(uploadFilePlaceholderPlugin, {
            add: { id, file, pos },
        });
        view.dispatch(tr);
        uploadFile(file)
            .then(src => {
            const pos = findPlaceholder(view.state, id);
            if (pos === null)
                return;
            const transaction = view.state.tr
                .replaceWith(pos, pos, schema.nodes.container_file.create({ src, alt: file.name }))
                .setMeta(uploadFilePlaceholderPlugin, { remove: { id } });
            view.dispatch(transaction);
        })
            .catch(error => {
            console.error(error);
            const transaction = view.state.tr.setMeta(uploadFilePlaceholderPlugin, {
                remove: { id },
            });
            view.dispatch(transaction);
            if (onShowToast) {
                onShowToast(dictionary.fileUploadError, ToastType.Error);
            }
        })
            .finally(() => {
            complete++;
            if (complete === files.length) {
                if (onFileUploadStop)
                    onFileUploadStop();
            }
        });
    }
};
export default insertAllFiles;
//# sourceMappingURL=insertAllFiles.js.map