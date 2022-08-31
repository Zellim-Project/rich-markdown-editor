"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embedSimplePlaceHolder_1 = require("../lib/embedSimplePlaceHolder");
const types_1 = require("../types");
const embedATask = function (view, event, pos, options) {
    const { dictionary, embedATask, onShowToast } = options;
    if (!embedATask) {
        console.warn("embedATask callback must be defined to handle image uploads.");
        return;
    }
    event.preventDefault();
    const { schema } = view.state;
    const id = `embedTask`;
    const { tr } = view.state;
    tr.setMeta(embedSimplePlaceHolder_1.embedTaskPlaceholder, {
        add: {
            id,
            pos,
        },
    });
    view.dispatch(tr);
    embedATask()
        .then(({ taskName, projectName, taskId, projectId }) => {
        const pos = embedSimplePlaceHolder_1.findPlaceholder(view.state, id, "task");
        if (pos === null)
            return;
        const transaction = view.state.tr
            .replaceWith(pos, pos, schema.nodes.container_task.create({
            taskName,
            projectName,
            taskId,
            projectId,
        }))
            .setMeta(embedSimplePlaceHolder_1.embedTaskPlaceholder, { remove: { id } });
        view.dispatch(transaction);
    })
        .catch(error => {
        console.error(error);
        const transaction = view.state.tr.setMeta(embedSimplePlaceHolder_1.embedTaskPlaceholder, {
            remove: { id },
        });
        view.dispatch(transaction);
        if (onShowToast) {
            onShowToast(dictionary.imageUploadError, types_1.ToastType.Error);
        }
    });
};
exports.default = embedATask;
//# sourceMappingURL=embedATask.js.map